export const PLAN_FEATURES = {
  TRIAL: {
    maxPhotos: 20,
    allowCustomMusic: false,
    allowPasswordProtection: false,
    maxGuests: 0,
    allowLayoutOverride: false,
    allowSeatingTable: false,
  },
  STANDARD: {
    maxPhotos: 20,
    allowCustomMusic: false,
    allowPasswordProtection: false,
    maxGuests: 50,
    allowLayoutOverride: false,
    allowSeatingTable: false,
  },
  PREMIUM: {
    maxPhotos: 30,
    allowCustomMusic: true,
    allowPasswordProtection: true,
    maxGuests: -1, // unlimited
    allowLayoutOverride: true,
    allowSeatingTable: true,
  },
} as const;

export type PlanFeatures = (typeof PLAN_FEATURES)[keyof typeof PLAN_FEATURES];

export function getEffectivePlanFeatures(
  billingStatus: string | null,
  currentPlanCode: string | null,
): PlanFeatures {
  if (billingStatus === 'PAID' && currentPlanCode === 'STANDARD') {
    return PLAN_FEATURES.STANDARD;
  }
  if (billingStatus === 'PAID' && currentPlanCode === 'PREMIUM') {
    return PLAN_FEATURES.PREMIUM;
  }
  return PLAN_FEATURES.TRIAL;
}
