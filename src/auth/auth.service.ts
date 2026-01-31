import { HttpException, Injectable } from '@nestjs/common';
import { HASH_KEY } from 'src/constants/index';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'src/helpers/security';
import { PrismaService } from 'src/prisma/prisma.service';
import { postVerificationEmail } from 'src/utils/mailjet.util';

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
  private readonly verificationCodeStore = new Map<
    string,
    { code: string; expiresAt: number }
  >();
  private readonly verificationExpiresMs = 3 * 60 * 1000;
  private readonly verificationServiceName = 'Sparklit';

  private generateVerificationCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  private validateVerificationCode(email: string, code: string) {
    const stored = this.verificationCodeStore.get(email);
    if (!stored) {
      throw new HttpException('verification code not found', 404);
    }
    if (Date.now() > stored.expiresAt) {
      this.verificationCodeStore.delete(email);
      throw new HttpException('verification code expired', 410);
    }
    if (stored.code !== code) {
      throw new HttpException('verification code mismatch', 400);
    }
  }

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
        country: true,
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
        country: true,
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
        country: user.country,
      },
      tokens,
    };
  }

  async registerUser(email: string, password: string, country?: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (user) throw new HttpException('already exist', 406);
    const normalizedCountry = country ? country.trim().toUpperCase() : null;
    const hashed = hash(password);
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        password: hashed,
        country: normalizedCountry,
      },
      select: {
        id: true,
        email: true,
        country: true,
      },
    });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        country: newUser.country,
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

  async sendVerificationEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });
    if (!user) {
      throw new HttpException('not exist', 404);
    }
    const code = this.generateVerificationCode();
    this.verificationCodeStore.set(email, {
      code,
      expiresAt: Date.now() + this.verificationExpiresMs,
    });
    await postVerificationEmail(email, {
      verificationCode: code,
      expiresIn: '3 minutes',
      serviceName: this.verificationServiceName,
    });
    return { sent: true, expiresInSeconds: this.verificationExpiresMs / 1000 };
  }

  async verifyEmailCode(email: string, code: string) {
    this.validateVerificationCode(email, code);
    return { verified: true };
  }

  async changePasswordWithCode(
    email: string,
    code: string,
    newPassword: string,
  ) {
    this.validateVerificationCode(email, code);
    const hashed = hash(newPassword);
    await this.prismaService.user.update({
      where: {
        email,
      },
      data: {
        password: hashed,
      },
    });
    this.verificationCodeStore.delete(email);
    return { updated: true };
  }
}
