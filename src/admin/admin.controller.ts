import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AdminJwtAuthGuard } from 'src/guards/admin-jwt-auth.guard';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(AdminJwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/dashboard-summary')
  getDashboardSummary() {
    return this.adminService.getDashboardSummary();
  }

  @Get('/invitations')
  getInvitationList() {
    return this.adminService.getInvitationList();
  }

  @Get('/invitations/trial')
  getTrialInvitationList() {
    return this.adminService.getTrialInvitationList();
  }

  @Get('/user-funnel')
  getUserFunnel() {
    return this.adminService.getUserFunnel();
  }

  @Get('/invitations/:uniqueId/rsvps')
  getInvitationRsvpList(@Param('uniqueId') uniqueId: string) {
    return this.adminService.getInvitationRsvpList(uniqueId);
  }

  @Delete('/invitations/:id')
  deleteInvitation(@Param('id') id: string) {
    return this.adminService.deleteInvitationByAdmin(Number(id));
  }
}
