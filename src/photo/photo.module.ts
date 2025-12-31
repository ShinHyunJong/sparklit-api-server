import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { NestjsFormDataModule, MemoryStoredFile } from 'nestjs-form-data';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [NestjsFormDataModule.config({ storage: MemoryStoredFile })],
  controllers: [PhotoController],
  providers: [PhotoService, PrismaService],
})
export class PhotoModule {}
