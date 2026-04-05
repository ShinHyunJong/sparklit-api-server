export const PLAN_FEATURES = {
  TRIAL: { maxPhotos: 20, allowCustomMusic: false },
  STANDARD: { maxPhotos: 20, allowCustomMusic: false },
  PREMIUM: { maxPhotos: 30, allowCustomMusic: true },
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
