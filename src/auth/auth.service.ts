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
  private readonly verificationExpiresMs = 3 * 60 * 1000;
  private readonly verificationServiceName = 'Sparklit';
  private readonly verificationPurpose = 'password_reset';

  private generateVerificationCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  private async validateVerificationCode(
    email: string,
    code: string,
    verificationId: number,
  ) {
    const record = await this.prismaService.emailVerification.findFirst({
      where: {
        id: verificationId,
        email,
        purpose: this.verificationPurpose,
      },
    });
    if (!record) {
      throw new HttpException('verification code not found', 404);
    }
    if (Date.now() > record.expiresAt.getTime()) {
      await this.prismaService.emailVerification.deleteMany({
        where: {
          email,
          purpose: this.verificationPurpose,
        },
      });
      throw new HttpException('verification code expired', 410);
    }
    if (record.code !== code) {
      await this.prismaService.emailVerification.update({
        where: {
          id: record.id,
        },
        data: {
          attemptCount: record.attemptCount + 1,
        },
      });
      throw new HttpException('verification code mismatch', 400);
    }
    return record;
  }

  /**
   *
   * @param email
   * @param payload
   * @returns
   */
  // Access token TTL shared with cookie Max-Age on the frontend so the
  // session invalidates at the same moment on both sides.
  private readonly accessTokenTtl = '7d';

  async getTokens(id: number, payload: string): Promise<Tokens> {
    const accessToken = await this.jwtService.signAsync(
      {
        id,
        payload,
      },
      {
        secret: HASH_KEY,
        expiresIn: this.accessTokenTtl,
      },
    );
    return { accessToken };
  }

  async getUserDetail(id: number, isImpersonation = false) {
    const userDetail = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        country: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!userDetail) return userDetail;

    // Sliding session: every time the client fetches the current user, we
    // issue a fresh access token so active users never get kicked out.
    // IMPORTANT: do NOT refresh impersonation sessions — they must stay
    // bound to the short expiry the admin flow signed them with so a
    // misplaced admin session cannot silently turn into a week-long login.
    if (isImpersonation) {
      return {
        ...userDetail,
        isAdmin: Boolean(userDetail.isAdmin),
        isImpersonation: true,
      };
    }

    const { accessToken } = await this.getTokens(
      userDetail.id,
      userDetail.email ?? '',
    );

    return {
      ...userDetail,
      isAdmin: Boolean(userDetail.isAdmin),
      accessToken,
    };
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
        name: true,
        isAdmin: true,
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
        name: user.name,
        isAdmin: Boolean(user.isAdmin),
        country: user.country,
      },
      tokens,
    };
  }

  async registerUser(
    name: string,
    email: string,
    password: string,
    phone: string,
    country?: string,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (user) throw new HttpException('already exist', 406);
    const normalizedName = name.trim();
    if (!normalizedName) throw new HttpException('name required', 400);
    const normalizedPhone = phone?.replace(/[^0-9+]/g, '').trim();
    if (!normalizedPhone) throw new HttpException('phone required', 400);
    const normalizedCountry = country ? country.trim().toUpperCase() : null;
    const hashed = hash(password);
    const newUser = await this.prismaService.user.create({
      data: {
        name: normalizedName,
        email,
        password: hashed,
        phone: normalizedPhone,
        country: normalizedCountry,
      },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        country: true,
      },
    });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        isAdmin: Boolean(newUser.isAdmin),
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
    const expiresAt = new Date(Date.now() + this.verificationExpiresMs);
    await this.prismaService.emailVerification.deleteMany({
      where: {
        email,
        purpose: this.verificationPurpose,
      },
    });
    const verification = await this.prismaService.emailVerification.create({
      data: {
        email,
        code,
        purpose: this.verificationPurpose,
        expiresAt,
      },
    });
    await postVerificationEmail(email, {
      verificationCode: code,
      expiresIn: '3 minutes',
      serviceName: this.verificationServiceName,
    });
    return {
      sent: true,
      expiresInSeconds: this.verificationExpiresMs / 1000,
      verificationId: verification.id,
    };
  }

  async verifyEmailCode(email: string, code: string, verificationId: number) {
    const record = await this.validateVerificationCode(
      email,
      code,
      verificationId,
    );
    if (!record.verifiedAt) {
      await this.prismaService.emailVerification.update({
        where: {
          id: record.id,
        },
        data: {
          verifiedAt: new Date(),
        },
      });
    }
    return { verified: true };
  }

  async changePasswordWithCode(
    email: string,
    code: string,
    verificationId: number,
    newPassword: string,
  ) {
    await this.validateVerificationCode(email, code, verificationId);
    const hashed = hash(newPassword);
    await this.prismaService.user.update({
      where: {
        email,
      },
      data: {
        password: hashed,
      },
    });
    await this.prismaService.emailVerification.deleteMany({
      where: {
        email,
        purpose: this.verificationPurpose,
      },
    });
    return { updated: true };
  }

  async changePasswordWithCurrent(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });
    if (!user) throw new HttpException('not exist', 404);
    const hashedCurrent = hash(currentPassword);
    if (user.password !== hashedCurrent) {
      throw new HttpException('invalid password', 400);
    }
    const hashed = hash(newPassword);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashed,
      },
    });
    return { updated: true };
  }
}
