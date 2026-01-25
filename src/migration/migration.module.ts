import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PrismaService } from 'src/prisma/prisma.service';
import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';

@Module({
  imports: [HttpModule],
  controllers: [MigrationController],
  providers: [MigrationService, PrismaService],
})
export class MigrationModule {}
