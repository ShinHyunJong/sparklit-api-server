import Mailjet from 'node-mailjet';

export const mailjet = Mailjet.apiConnect(
  process.env.MJ_API_KEY,
  process.env.MJ_SECRET_KEY,
);

export type RsvpEmailVars = {
  rsvpDashboardUrl: string;
  attendanceStatus: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  submittedAt: string; // e.g. "2025-12-16 18:12 (KST)"
};

export const postRSVPmail = async (
  email: string,
  name: string,
  input: RsvpEmailVars,
) => {
  try {
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'notice@sparklit.co',
            Name: 'Sparklit',
          },
          To: [
            {
              Email: email,
              Name: name,
            },
          ],
          TemplateID: 7587543,
          TemplateLanguage: true,
          Subject: `New Wedding RSVP Arrived!`,
          Variables: {
            ...input,
          },
          TemplateErrorReporting: {
            Email: 'pleiade9638@gmail.com',
            Name: 'Ian',
          },
        },
      ],
    });
    const result = await request;
    console.log(JSON.stringify(result.response.data));
    return result.response.data;
  } catch (error) {
    console.log('Mailjet Error: ', error);
  }
};
