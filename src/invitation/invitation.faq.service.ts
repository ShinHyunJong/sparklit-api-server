import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvitationFaqService {
  constructor(private readonly prismaService: PrismaService) {}

  private async getInvitationByUniqueId(uniqueId: string, userId: number) {
    const invitation = await this.prismaService.invitation.findFirst({
      where: { uniqueId, userId },
      select: { id: true },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found.');
    }

    return invitation;
  }

  async getFaqList(uniqueId: string, userId: number) {
    const invitation = await this.getInvitationByUniqueId(uniqueId, userId);
    return this.prismaService.invitationFaq.findMany({
      where: { invitationId: invitation.id },
      orderBy: { id: 'asc' },
    });
  }

  async addFaq(
    uniqueId: string,
    userId: number,
    question: string,
    answer: string,
  ) {
    const invitation = await this.getInvitationByUniqueId(uniqueId, userId);
    return this.prismaService.invitationFaq.create({
      data: {
        invitationId: invitation.id,
        question,
        answer,
      },
    });
  }

  async updateFaq(
    uniqueId: string,
    userId: number,
    faqId: number,
    question: string,
    answer: string,
  ) {
    const invitation = await this.getInvitationByUniqueId(uniqueId, userId);
    const result = await this.prismaService.invitationFaq.updateMany({
      where: { id: faqId, invitationId: invitation.id },
      data: { question, answer },
    });

    if (result.count === 0) {
      throw new NotFoundException('FAQ not found.');
    }

    return this.prismaService.invitationFaq.findUnique({
      where: { id: faqId },
    });
  }

  async deleteFaq(uniqueId: string, userId: number, faqId: number) {
    const invitation = await this.getInvitationByUniqueId(uniqueId, userId);
    const result = await this.prismaService.invitationFaq.deleteMany({
      where: { id: faqId, invitationId: invitation.id },
    });

    if (result.count === 0) {
      throw new NotFoundException('FAQ not found.');
    }

    return { deleted: result.count };
  }
}
