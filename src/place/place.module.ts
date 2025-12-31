import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { PlacesController } from './place.controller';
import { PlacesService } from './place.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PlacesController],
  providers: [PlacesService, PrismaService],
})
export class PlacesModule {}
