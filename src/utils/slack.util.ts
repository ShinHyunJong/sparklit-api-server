import { SLACK_PAYMENT_WEBHOOK_URL, SLACK_SIGNUP_WEBHOOK_URL } from 'src/constants';

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

export const postSlackSignupMessage = async (input: {
  name: string;
  email: string;
  phone: string;
  country: string;
}) => {
  if (!SLACK_SIGNUP_WEBHOOK_URL) return;

  const registeredAtKst = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());

  const payload: SlackPayload = {
    text: `New user signed up: ${input.email}`,
    attachments: [
      {
        color: '#36a64f',
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '🎉 New User Signed Up',
            },
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Name*\n${input.name || '-'}` },
              { type: 'mrkdwn', text: `*Email*\n${input.email}` },
              { type: 'mrkdwn', text: `*Phone*\n${input.phone || '-'}` },
              { type: 'mrkdwn', text: `*Country*\n${input.country || '-'}` },
            ],
          },
          {
            type: 'context',
            elements: [
              { type: 'mrkdwn', text: `Registered at ${registeredAtKst} (KST)` },
            ],
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(SLACK_SIGNUP_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Slack signup webhook failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Slack signup webhook error:', error);
  }
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
