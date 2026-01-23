import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { InvitationColorController } from './invitation.color.controller';
import { InvitationColorService } from './invitation.color.service';
import { InvitationMigrationController } from './invitation.migration.controller';
import { InvitationMigrationService } from './invitation.migration.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NestjsFormDataModule, MemoryStoredFile } from 'nestjs-form-data';

@Module({
  imports: [NestjsFormDataModule.config({ storage: MemoryStoredFile })],
  controllers: [
    InvitationController,
    InvitationColorController,
    InvitationMigrationController,
  ],
  providers: [
    InvitationService,
    InvitationColorService,
    InvitationMigrationService,
    PrismaService,
  ],
})
export class InvitationModule {}
