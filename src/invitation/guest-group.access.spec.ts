import { BadRequestException } from '@nestjs/common';
import { GuestGroupService } from './guest-group.service';

describe('GuestGroupService.updateGuestSettings — public/private switches', () => {
  const settings = {
    isPublic: true,
    isPasswordProtected: true,
    universalPassword: null,
    accessMode: 'common',
    guestListEnabled: false,
  };
  const fakePrisma = {
    invitation: {
      updateMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };
  let service: GuestGroupService;

  beforeEach(() => {
    jest.clearAllMocks();
    fakePrisma.invitation.updateMany.mockResolvedValue({ count: 1 });
    fakePrisma.invitation.findUnique.mockResolvedValue(settings);
    service = new GuestGroupService(fakePrisma as any);
    jest
      .spyOn(service as any, 'assertOwnership')
      .mockResolvedValue({ id: 1 });
  });

  it('rejects turning both switches off in one request', async () => {
    await expect(
      service.updateGuestSettings('uid-1', 42, {
        isPublic: false,
        isPasswordProtected: false,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(fakePrisma.invitation.updateMany).not.toHaveBeenCalled();
  });

  it('turning Public off only succeeds while Private is on', async () => {
    await service.updateGuestSettings('uid-1', 42, { isPublic: false });

    expect(fakePrisma.invitation.updateMany).toHaveBeenCalledWith({
      where: { uniqueId: 'uid-1', isPasswordProtected: true },
      data: { isPublic: false },
    });
  });

  it('turning Private off only succeeds while Public is on', async () => {
    await service.updateGuestSettings('uid-1', 42, {
      isPasswordProtected: false,
    });

    expect(fakePrisma.invitation.updateMany).toHaveBeenCalledWith({
      where: { uniqueId: 'uid-1', isPublic: true },
      data: { isPasswordProtected: false },
    });
  });

  it('throws 400 when the guard blocks turning off the last switch', async () => {
    fakePrisma.invitation.updateMany.mockResolvedValue({ count: 0 });
    fakePrisma.invitation.findUnique.mockResolvedValue({
      ...settings,
      isPublic: true,
      isPasswordProtected: false,
    });

    await expect(
      service.updateGuestSettings('uid-1', 42, { isPublic: false }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('treats a 0-affected no-op (already off) as success', async () => {
    const alreadyOff = { ...settings, isPublic: false };
    fakePrisma.invitation.updateMany.mockResolvedValue({ count: 0 });
    fakePrisma.invitation.findUnique.mockResolvedValue(alreadyOff);

    await expect(
      service.updateGuestSettings('uid-1', 42, { isPublic: false }),
    ).resolves.toEqual(alreadyOff);
  });

  it('does not guard when the same request keeps the other switch on', async () => {
    await service.updateGuestSettings('uid-1', 42, {
      isPublic: false,
      isPasswordProtected: true,
    });

    expect(fakePrisma.invitation.updateMany).toHaveBeenCalledWith({
      where: { uniqueId: 'uid-1' },
      data: { isPublic: false, isPasswordProtected: true },
    });
  });

  it('does not guard when turning a switch on', async () => {
    await service.updateGuestSettings('uid-1', 42, {
      isPasswordProtected: true,
      accessMode: 'specific',
    });

    expect(fakePrisma.invitation.updateMany).toHaveBeenCalledWith({
      where: { uniqueId: 'uid-1' },
      data: { isPasswordProtected: true, accessMode: 'specific' },
    });
  });

  it('returns the saved settings including isPublic', async () => {
    const result = await service.updateGuestSettings('uid-1', 42, {
      isPublic: true,
    });

    expect(fakePrisma.invitation.findUnique).toHaveBeenCalledWith({
      where: { uniqueId: 'uid-1' },
      select: {
        isPublic: true,
        isPasswordProtected: true,
        universalPassword: true,
        accessMode: true,
        guestListEnabled: true,
      },
    });
    expect(result).toEqual(settings);
  });
});
