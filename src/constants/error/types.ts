export type ErrorCodeType = {
  duplicatedAccount: ErrorRespponse;
  loginFailed: ErrorRespponse;
  userIdRequired: ErrorRespponse;
};

export type AuthErrorCode = {
  social: ErrorRespponse;
  duplicated: ErrorRespponse;
  loginFailed: ErrorRespponse;
};

export type ErrorRespponse = {
  code: string;
  reason: string;
  type?: string;
  method?: string;
};
