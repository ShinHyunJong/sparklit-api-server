// src/places/places.controller.ts

import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PlacesService } from './place.service';
import { PlaceDto } from './dto/place.dto';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post('/:invitationUid')
  async postPlace(
    @Param('invitationUid') invitationUid: string,
    @Body()
    body: PlaceDto,
  ) {
    return this.placesService.postPlace(invitationUid, body);
  }

  @Post('/time/:invitationPlaceId')
  async postPlaceTime(@Param('invitationPlaceId') invitationPlaceId: number) {
    return this.placesService.postPlaceTime(invitationPlaceId);
  }

  @Put('/time/:timeId')
  async putPlaceTime(
    @Param('timeId') timeId: number,
    @Body()
    {
      hour,
      minute,
      ampm,
      name,
      description,
    }: {
      hour: number;
      minute: number;
      ampm: string;
      name: string;
      description?: string;
    },
  ) {
    return this.placesService.updatePlaceTime(
      timeId,
      hour,
      minute,
      ampm,
      name,
      description,
    );
  }

  @Delete('/:invitationPlaceId')
  async deletePlace(@Param('invitationPlaceId') invitationPlaceId: number) {
    return this.placesService.deletePlace(invitationPlaceId);
  }

  @Delete('/time/:timeId')
  async deletePlaceTime(@Param('timeId') timeId: number) {
    return this.placesService.deletePlaceTime(timeId);
  }

  @Get('autocomplete')
  async getAutocompletePredictions(
    @Query('input') input: string,
    @Query('sessionToken') sessionToken: string, // 세션 토큰 받기
  ) {
    if (!input) {
      throw new HttpException(
        '검색어를 입력해야 합니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!sessionToken) {
      throw new HttpException(
        '세션 토큰이 누락되었습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const predictions = await this.placesService.getPlaceAutocomplete(
        input,
        sessionToken,
      );
      return predictions;
    } catch (error) {
      console.error('NestJS 컨트롤러에서 자동 완성 오류:', error.message);
      throw new HttpException(
        '장소 자동 완성을 처리하는 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // TODO: Place Details API 엔드포인트도 여기에 추가할 수 있습니다.
  @Get('detail')
  async getPlaceDetails(
    @Query('placeId') placeId: string,
    @Query('sessionToken') sessionToken: string,
  ) {
    if (!placeId || !sessionToken) {
      throw new HttpException(
        'placeId 또는 sessionToken이 누락되었습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const details = await this.placesService.getPlaceDetails(
        placeId,
        sessionToken,
      );
      return details;
    } catch (error) {
      console.error('NestJS 컨트롤러에서 상세 정보 오류:', error.message);
      throw new HttpException(
        '장소 상세 정보를 처리하는 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
