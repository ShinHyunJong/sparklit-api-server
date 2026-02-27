import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HASH_KEY } from 'src/constants';
import { hash } from 'src/helpers/security';
import { PrismaService } from 'src/prisma/prisma.service';

type AdminTokens = {
  accessToken: string;
};

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private async getAdminTokens(id: number, email: string): Promise<AdminTokens> {
    const accessToken = await this.jwtService.signAsync(
      {
        id,
        payload: email,
        role: 'admin',
      },
      {
        secret: HASH_KEY,
      },
    );
    return { accessToken };
  }

  async loginAdmin(email: string, password: string) {
    const admin = await this.prismaService.admin.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    if (!admin) {
      throw new HttpException('not exist', 406);
    }

    const hashedPassword = hash(password);
    if (!admin.password || admin.password !== hashedPassword) {
      throw new HttpException('not exist', 406);
    }

    const tokens = await this.getAdminTokens(admin.id, admin.email ?? '');
    return {
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
      tokens,
    };
  }
}
