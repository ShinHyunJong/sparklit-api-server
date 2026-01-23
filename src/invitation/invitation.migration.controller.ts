import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { InvitationMigrationService } from './invitation.migration.service';

@Controller('admin/migration')
export class InvitationMigrationController {
  constructor(
    private readonly invitationMigrationService: InvitationMigrationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/dress-colors')
  migrateDressColors() {
    return this.invitationMigrationService.migrateDressColors();
  }
}
