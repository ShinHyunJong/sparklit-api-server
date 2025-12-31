// src/places/places.service.ts

import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { GOOGLE_PLACES_API_KEY } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlaceDto } from './dto/place.dto';
import dayjs from 'dayjs';

@Injectable()
export class PlacesService {
  private readonly GOOGLE_PLACES_API_KEY: string;
  private readonly AUTOCOMPLETE_BASE_URL =
    'https://maps.googleapis.com/maps/api/place/autocomplete/json';
  private readonly DETAILS_BASE_URL =
    'https://maps.googleapis.com/maps/api/place/details/json';

  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {
    // 환경 변수에서 API 키 가져오기
    this.GOOGLE_PLACES_API_KEY = GOOGLE_PLACES_API_KEY;
    if (!this.GOOGLE_PLACES_API_KEY) {
      throw new Error('GOOGLE_PLACES_API_KEY 환경 변수가 설정되지 않았습니다.');
    }
  }

  async postPlace(invitationUid: string, body: PlaceDto) {
    const invitation = await this.prismaService.invitation.findUnique({
      where: { uniqueId: invitationUid },
    });
    if (!invitation) {
      throw new HttpException(
        '유효하지 않은 초대장입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    let place = await this.prismaService.place.findUnique({
      where: {
        googlePlaceId: body.googlePlaceId,
      },
    });
    if (!place) {
      place = await this.prismaService.place.create({
        data: {
          googlePlaceId: body.googlePlaceId,
          name: body.name,
          address: body.address,
          lat: body.lat,
          lng: body.lng,
        },
      });
    }

    const exisingInvitationPlace =
      await this.prismaService.invitationPlace.findFirst({
        where: {
          placeId: place.id,
        },
      });

    if (exisingInvitationPlace) {
      throw new HttpException(
        '초대장에 이미 추가된 장소입니다.',
        HttpStatus.CONFLICT,
      );
    }

    const prevInvitationPlaceCount =
      await this.prismaService.invitationPlace.count({
        where: { invitationId: invitation.id },
      });

    const invitationPlace = await this.prismaService.invitationPlace.create({
      data: {
        invitationId: invitation.id,
        placeId: place.id,
        order: prevInvitationPlaceCount + 1,
      },
    });

    await this.prismaService.invitationPlaceTime.create({
      data: {
        invitationPlaceId: invitationPlace.id,
        time: dayjs().hour(12).minute(0).second(0).toDate(),
      },
    });

    return invitationPlace;
  }

  async postPlaceTime(invitationPlaceId: number) {
    return this.prismaService.invitationPlaceTime.create({
      data: {
        invitationPlaceId: invitationPlaceId,
        time: dayjs().hour(12).minute(0).second(0).toDate(),
      },
    });
  }

  async deletePlaceTime(timeId: number) {
    return this.prismaService.invitationPlaceTime.delete({
      where: {
        id: timeId,
      },
    });
  }

  async updatePlaceTime(
    timeId: number,
    hour: number,
    minute: number,
    ampm: string,
    name: string,
    description?: string,
  ) {
    const ispm = ampm.toLowerCase() === 'pm';
    if (ispm && hour < 12) {
      hour += 12;
    } else if (!ispm && hour === 12) {
      hour = 0;
    }
    await this.prismaService.invitationPlaceTime.update({
      where: {
        id: timeId,
      },
      data: {
        time: dayjs().hour(hour).minute(minute).second(0).toDate(),
        name,
        description,
      },
    });
  }

  async deletePlace(placeId: number) {
    return this.prismaService.invitationPlace.delete({
      where: {
        id: placeId,
      },
    });
  }

  async getPlaceAutocomplete(
    input: string,
    sessionToken: string,
  ): Promise<any[]> {
    const params = {
      input: input,
      key: this.GOOGLE_PLACES_API_KEY,
      language: 'en', // 한국어 결과
      sessiontoken: sessionToken, // 세션 토큰 포함
      // types: '(cities)', // 필요시 특정 타입으로 제한
      components: 'country:ph', // 필요시 특정 국가로 제한
    };

    try {
      // HttpService.get은 Observable을 반환하므로 lastValueFrom을 사용하여 Promise로 변환
      const response = await lastValueFrom(
        this.httpService.get(this.AUTOCOMPLETE_BASE_URL, { params }),
      );

      if (response.data.status === 'OK') {
        return response.data.predictions;
      } else if (response.data.status === 'ZERO_RESULTS') {
        return []; // 결과가 없을 때 빈 배열 반환
      } else {
        // API 오류 처리
        console.error(
          'Google Places Autocomplete API 오류:',
          response.data.status,
          response.data.error_message,
        );
        throw new HttpException(
          `Google Places API 오류: ${response.data.error_message || response.data.status}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      // 네트워크 또는 기타 요청 오류 처리
      console.error('자동 완성 API 요청 중 오류 발생:', error.message);
      if (error.response) {
        console.error('Google API 응답 데이터:', error.response.data);
      }
      throw new HttpException(
        'Google Places API와의 통신 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // TODO: 장소 상세 정보를 가져오는 함수도 여기에 추가할 수 있습니다.
  async getPlaceDetails(placeId: string, sessionToken: string): Promise<any> {
    const params = {
      place_id: placeId,
      key: this.GOOGLE_PLACES_API_KEY,
      language: 'en',
      sessiontoken: sessionToken,
      fields:
        'name,formatted_address,geometry,website,international_phone_number', // 필요한 필드만 요청
    };

    try {
      const response = await lastValueFrom(
        this.httpService.get(this.DETAILS_BASE_URL, { params }),
      );

      if (response.data.status === 'OK') {
        return response.data.result;
      } else {
        console.error(
          'Google Places Details API 오류:',
          response.data.status,
          response.data.error_message,
        );
        throw new HttpException(
          `Google Places API 오류: ${response.data.error_message || response.data.status}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      console.error('장소 상세 정보 API 요청 중 오류 발생:', error.message);
      if (error.response) {
        console.error('Google API 응답 데이터:', error.response.data);
      }
      throw new HttpException(
        'Google Places API와의 통신 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
