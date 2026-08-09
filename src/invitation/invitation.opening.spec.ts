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
      },
    });
  });
});
