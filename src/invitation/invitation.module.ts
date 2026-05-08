import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { InvitationColorController } from './invitation.color.controller';
import { InvitationColorService } from './invitation.color.service';
import { InvitationFaqController } from './invitation.faq.controller';
import { InvitationFaqService } from './invitation.faq.service';
import { InvitationMigrationController } from './invitation.migration.controller';
import { InvitationMigrationService } from './invitation.migration.service';
import { GuestGroupController } from './guest-group.controller';
import { GuestGroupService } from './guest-group.service';
import { PaymentMethodController } from './payment-method.controller';
import { PaymentMethodService } from './payment-method.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NestjsFormDataModule, MemoryStoredFile } from 'nestjs-form-data';

@Module({
  imports: [NestjsFormDataModule.config({ storage: MemoryStoredFile })],
  controllers: [
    InvitationController,
    InvitationColorController,
    InvitationFaqController,
    InvitationMigrationController,
    GuestGroupController,
    PaymentMethodController,
  ],
  providers: [
    InvitationService,
    InvitationColorService,
    InvitationFaqService,
    InvitationMigrationService,
    GuestGroupService,
    PaymentMethodService,
    PrismaService,
  ],
})
export class InvitationModule {}
