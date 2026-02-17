import { SLACK_PAYMENT_WEBHOOK_URL } from 'src/constants';

type SlackPayload = {
  text: string;
};

export const postSlackPaymentWebhookMessage = async (text: string) => {
  if (!SLACK_PAYMENT_WEBHOOK_URL) return;

  try {
    const response = await fetch(SLACK_PAYMENT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text } as SlackPayload),
    });

    if (!response.ok) {
      throw new Error(`Slack webhook failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('Slack webhook error:', error);
  }
};
