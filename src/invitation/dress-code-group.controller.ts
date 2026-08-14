import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { UpdateDressCodeGroupsDto } from './dto/dress-code-group.dto';
import { DressCodeGroupService } from './dress-code-group.service';

@Controller('invitation/dressCodeGroups')
export class DressCodeGroupController {
  constructor(
    private readonly dressCodeGroupService: DressCodeGroupService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:uniqueId')
  getGroups(@Req() req, @Param('uniqueId') uniqueId: string) {
    return this.dressCodeGroupService.getGroups(uniqueId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:uniqueId')
  updateGroups(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateDressCodeGroupsDto,
  ) {
    return this.dressCodeGroupService.updateGroups(
      uniqueId,
      req.user.id,
      body.groups,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:uniqueId/:groupId/photo')
  @FormDataRequest({ storage: MemoryStoredFile })
  updateGroupPhoto(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Param('groupId') groupId: string,
    @Body()
    body: {
      originalFile: MemoryStoredFile;
      croppedFile: MemoryStoredFile;
      photoJSON?: string;
    },
  ) {
    return this.dressCodeGroupService.updateGroupPhoto(
      uniqueId,
      req.user.id,
      Number(groupId),
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:uniqueId/:groupId/photo')
  deleteGroupPhoto(
    @Req() req,
    @Param('uniqueId') uniqueId: string,
    @Param('groupId') groupId: string,
  ) {
    return this.dressCodeGroupService.deleteGroupPhoto(
      uniqueId,
      req.user.id,
      Number(groupId),
    );
  }
}
