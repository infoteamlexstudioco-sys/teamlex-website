import { createServerFn } from '@tanstack/react-start';
import {
  buildStudioMessageEmail,
  parseStudioMessage,
  type StudioMessageRequest,
} from './studio-message';

const GATEWAY_URL =
  'https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send';

const DELIVERY_ERROR =
  'Your message could not be delivered. Please email teamlexstudio877@gmail.com.';

/**
 * Delivers a website inquiry or review into the studio's Gmail inbox.
 * The recipient is fixed to the studio address and never taken from the client.
 */
export const sendStudioMessage = createServerFn({ method: 'POST' })
  .validator((input: StudioMessageRequest) => parseStudioMessage(input))
  .handler(async ({ data }) => {
    if (!data.ok) return { ok: false as const, error: data.error };

    const apiKey = process.env['LOVABLE_API_KEY'];
    const connectionKey = process.env['GOOGLE_MAIL_API_KEY'];
    if (!apiKey || !connectionKey) return { ok: false as const, error: DELIVERY_ERROR };

    const { raw } = buildStudioMessageEmail(data.message);

    let response: Response;
    try {
      response = await fetch(GATEWAY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'X-Connection-Api-Key': connectionKey,
        },
        body: JSON.stringify({ raw }),
      });
    } catch {
      return { ok: false as const, error: DELIVERY_ERROR };
    }

    if (!response.ok) {
      const detail = (await response.text()).slice(0, 500);
      console.error(`Teamlex message delivery failed [${response.status}]: ${detail}`);
      return { ok: false as const, error: DELIVERY_ERROR };
    }

    return { ok: true as const };
  });
