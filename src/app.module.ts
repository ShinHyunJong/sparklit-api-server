import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthJwtStrategy } from './strategies';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { InvitationModule } from './invitation/invitation.module';
import { PlacesModule } from './place/place.module';
import { PhotoModule } from './photo/photo.module';
import { MigrationModule } from './migration/migration.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    InvitationModule,
    PlacesModule,
    PhotoModule,
    MigrationModule,
    PaymentModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AuthService,
    JwtService,
    PrismaService,
    AuthJwtStrategy,
    JwtAuthGuard,
  ],
})
export class AppModule {}
