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
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
    });
  }

  async addFaq(
    uniqueId: string,
    userId: number,
    question: string,
    answer: string,
  ) {
    const invitation = await this.getInvitationByUniqueId(uniqueId, userId);
    const { _max } = await this.prismaService.invitationFaq.aggregate({
      where: { invitationId: invitation.id },
      _max: { order: true },
    });
    const nextOrder = (_max.order ?? 0) + 1;
    return this.prismaService.invitationFaq.create({
      data: {
        invitationId: invitation.id,
        question,
        answer,
        order: nextOrder,
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

  async updateFaqOrder(uniqueId: string, userId: number, faqIds: number[]) {
    if (faqIds.length === 0) return { updated: 0 };
    const invitation = await this.getInvitationByUniqueId(uniqueId, userId);

    const updates = faqIds.map((faqId, index) =>
      this.prismaService.invitationFaq.updateMany({
        where: { id: faqId, invitationId: invitation.id },
        data: { order: index + 1 },
      }),
    );

    const results = await this.prismaService.$transaction(updates);
    const updated = results.reduce((sum, item) => sum + item.count, 0);
    return { updated };
  }
}
