import { HttpException, Injectable } from '@nestjs/common';
import { HASH_KEY } from 'src/constants/index';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'src/helpers/security';
import { PrismaService } from 'src/prisma/prisma.service';

export type TokenInfo = {
  id: number;
  payload: string;
  expiresIn: string;
};

export type Tokens = {
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  /**
   *
   * @param email
   * @param payload
   * @returns
   */
  async getTokens(id: number, payload: string): Promise<Tokens> {
    const accessToken = await this.jwtService.signAsync(
      {
        id,
        payload,
      },
      {
        secret: HASH_KEY,
      },
    );
    return { accessToken };
  }

  async getUserDetail(id: number) {
    const userDetail = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return userDetail;
  }

  async loginUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
        email: true,
      },
    });
    if (!user) throw new HttpException('not exist', 406);
    const hashed = hash(password);
    if (user.password !== hashed) throw new HttpException('not exist', 406);
    const tokens = await this.getTokens(user.id, user.email);
    return {
      user: {
        id: user.id,
        email: user.email,
      },
      tokens,
    };
  }

  async registerUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (user) throw new HttpException('already exist', 406);
    const hashed = hash(password);
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        password: hashed,
      },
      select: {
        id: true,
        email: true,
      },
    });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
      },
      tokens,
    };
  }

  async checkEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return { exists: true };
    }
    return { exists: false };
  }
}
