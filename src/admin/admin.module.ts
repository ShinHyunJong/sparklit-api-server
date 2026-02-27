import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminJwtAuthGuard } from 'src/guards/admin-jwt-auth.guard';
import { AdminController } from './admin.controller';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController, AdminAuthController],
  providers: [
    AdminService,
    AdminAuthService,
    AdminJwtAuthGuard,
    PrismaService,
    JwtService,
  ],
})
export class AdminModule {}
