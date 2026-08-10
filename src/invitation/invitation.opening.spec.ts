import { Prisma } from '../../generated/prisma/client';
import { InvitationService } from './invitation.service';

describe('InvitationService.updateOpening', () => {
  const fakePrisma = {
    invitation: {
      update: jest.fn().mockResolvedValue({ id: 1, openingEnabled: true }),
    },
  };
  let service: InvitationService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new InvitationService(fakePrisma as any);
    jest
      .spyOn(service as any, 'assertInvitationOwnership')
      .mockResolvedValue(undefined);
    jest.spyOn(service as any, 'assertNotLocked').mockResolvedValue(undefined);
  });

  it('updates opening fields after ownership and lock checks', async () => {
    const result = await service.updateOpening('uid-1', 42, {
      openingEnabled: true,
      openingText1: 'HELLO',
      openingText2: '',
      openingText3: null,
    });

    expect((service as any).assertInvitationOwnership).toHaveBeenCalledWith('uid-1', 42);
    expect((service as any).assertNotLocked).toHaveBeenCalledWith('uid-1');
    expect(fakePrisma.invitation.update).toHaveBeenCalledWith({
      where: { uniqueId: 'uid-1' },
      data: {
        openingEnabled: true,
        openingText1: 'HELLO',
        openingText2: null,
        openingText3: null,
        openingStyle: Prisma.JsonNull,
      },
    });
    expect(result).toEqual({ id: 1, openingEnabled: true });
  });

  it('coerces openingEnabled to boolean and trims texts', async () => {
    await service.updateOpening('uid-1', 42, {
      openingEnabled: undefined as any,
      openingText1: '  spaced  ',
    });

    expect(fakePrisma.invitation.update).toHaveBeenCalledWith({
      where: { uniqueId: 'uid-1' },
      data: {
        openingEnabled: false,
        openingText1: 'spaced',
        openingText2: null,
        openingText3: null,
        openingStyle: Prisma.JsonNull,
      },
    });
  });

  it('keeps an author line break inside a phrase', async () => {
    await service.updateOpening('uid-1', 42, {
      openingText1: '  WE ARE\nGETTING MARRIED  ',
    });

    expect(fakePrisma.invitation.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          openingText1: 'WE ARE\nGETTING MARRIED',
        }),
      }),
    );
  });

  it('stores recognised style options', async () => {
    await service.updateOpening('uid-1', 42, {
      openingStyle: { textColor: '#FF8800', fontScale: 'large' },
    });

    expect(fakePrisma.invitation.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          openingStyle: { textColor: '#ff8800', fontScale: 'large' },
        }),
      }),
    );
  });

  it('drops malformed style values instead of persisting them', async () => {
    await service.updateOpening('uid-1', 42, {
      openingStyle: { textColor: 'red', fontScale: 'huge' } as any,
    });

    expect(fakePrisma.invitation.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ openingStyle: Prisma.JsonNull }),
      }),
    );
  });
});
