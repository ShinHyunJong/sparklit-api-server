import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvitationMigrationService {
  constructor(private readonly prismaService: PrismaService) {}

  private normalizeColor(color: string | null | undefined) {
    if (!color) return null;
    const trimmed = color.trim();
    if (!trimmed) return null;
    const lower = trimmed.toLowerCase();
    return lower.startsWith('#') ? lower : `#${lower}`;
  }

  async migrateDressColors() {
    const chunkSize = 500;
    const types = ['gentleman', 'lady'] as const;
    let processed = 0;
    let created = 0;
    let updated = 0;

    while (true) {
      const invitationList = await this.prismaService.invitation.findMany({
        select: {
          id: true,
          dressCodeMainColor: true,
          dressCodeSubColor: true,
          dressCodeThirdColor: true,
        },
        orderBy: { id: 'asc' },
        skip: processed,
        take: chunkSize,
      });

      if (invitationList.length === 0) break;

      for (const invitation of invitationList) {
        const colors = [
          this.normalizeColor(invitation.dressCodeMainColor),
          this.normalizeColor(invitation.dressCodeSubColor),
          this.normalizeColor(invitation.dressCodeThirdColor),
        ];

        if (colors.every((value) => !value)) {
          processed += 1;
          continue;
        }

        const existing = await this.prismaService.invitationDressColor.findMany(
          {
            where: {
              invitationId: invitation.id,
              order: { in: [1, 2, 3] },
            },
            select: { id: true, color: true, order: true, type: true },
          },
        );

        const getMap = (type: (typeof types)[number]) => {
          const byType = new Map<number, (typeof existing)[number]>();
          for (const item of existing) {
            if (item.order == null) continue;
            if (item.type === type) {
              byType.set(item.order, item);
            }
          }
          if (type === 'gentleman') {
            for (const item of existing) {
              if (item.order == null) continue;
              if (!item.type && !byType.has(item.order)) {
                byType.set(item.order, item);
              }
            }
          }
          return byType;
        };

        for (const type of types) {
          const existingMap = getMap(type);
          for (let index = 0; index < colors.length; index += 1) {
            const color = colors[index];
            if (!color) continue;
            const order = index + 1;
            const row = existingMap.get(order);
            if (!row) {
              await this.prismaService.invitationDressColor.create({
                data: {
                  invitationId: invitation.id,
                  type,
                  color,
                  order,
                },
              });
              created += 1;
              continue;
            }
            const normalizedExisting = this.normalizeColor(row.color ?? '');
            if (normalizedExisting !== color || row.type !== type) {
              await this.prismaService.invitationDressColor.update({
                where: { id: row.id },
                data: { color, type },
              });
              updated += 1;
            }
          }
        }

        processed += 1;
      }
    }

    return {
      processed,
      created,
      updated,
    };
  }
}
