import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { MigrationService } from './migration.service';

@Controller('/migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/places/refresh-address')
  refreshPlaceAddress(
    @Query('apply') apply?: string,
    @Query('limit') limit?: string,
  ) {
    const shouldApply = apply === 'true';
    const parsedLimit = limit ? Number(limit) : undefined;
    return this.migrationService.refreshPlaceAddress({
      apply: shouldApply,
      limit: parsedLimit,
    });
  }
}
