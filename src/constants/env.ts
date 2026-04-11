export const HASH_KEY = process.env.HASH_KEY;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
export const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID;
export const AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY;
export const AWS_S3_REGION = process.env.AWS_S3_REGION || 'ap-southeast-1';
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || 'sparklit-assets';
export const PAYMONGO_PUBLIC_KEY = process.env.PAYMONGO_PUBLIC_KEY;
export const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;
export const PAYMONGO_WEBHOOK_SECRET = process.env.PAYMONGO_WEBHOOK_SECRET;
export const PAYMENT_SUCCESS_URL =
  process.env.PAYMENT_SUCCESS_URL || 'http://localhost:8080/payment/success';
export const PAYMENT_CANCEL_URL =
  process.env.PAYMENT_CANCEL_URL || 'http://localhost:8080/payment/cancel';
export const SLACK_PAYMENT_WEBHOOK_URL =
  process.env.SLACK_PAYMENT_WEBHOOK_URL || '';
export const SLACK_SIGNUP_WEBHOOK_URL =
  process.env.SLACK_SIGNUP_WEBHOOK_URL || '';
