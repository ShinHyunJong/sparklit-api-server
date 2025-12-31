import { ErrorCodeType } from './types';

const errorCode: ErrorCodeType = {
  duplicatedAccount: {
    code: 'AF1001',
    reason: '이미 가입된 계정입니다.',
  },
  loginFailed: {
    code: 'AF2000',
    reason: '가입된 정보가 없습니다.',
  },
  userIdRequired: {
    code: 'GF1001',
    reason: '유저 아이디가 존재하지 않습니다.',
  },
};

export default errorCode;
