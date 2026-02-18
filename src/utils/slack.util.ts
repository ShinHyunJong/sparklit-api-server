import { SLACK_PAYMENT_WEBHOOK_URL } from 'src/constants';

type SlackTextObject = {
  type: 'mrkdwn' | 'plain_text';
  text: string;
};

type SlackBlock = {
  type: string;
  text?: SlackTextObject;
  fields?: SlackTextObject[];
  elements?: SlackTextObject[];
};

type SlackAttachment = {
  color?: string;
  blocks?: SlackBlock[];
};

type SlackPayload = {
  text?: string;
  attachments?: SlackAttachment[];
};

export const postSlackPaymentWebhookMessage = async (payload: SlackPayload) => {
  if (!SLACK_PAYMENT_WEBHOOK_URL) return;

  try {
    const response = await fetch(SLACK_PAYMENT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Slack webhook failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('Slack webhook error:', error);
  }
};
