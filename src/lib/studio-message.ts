import { studioEmail } from './teamlex';

export type StudioMessageKind = 'project' | 'review';

export interface StudioMessageRequest {
  kind: StudioMessageKind;
  name: string;
  email?: string;
  service: string;
  details: string;
  rating?: string;
  budget?: string;
  musicLink?: string;
  preferredContact?: string;
  /** Hidden honeypot: real people never see or fill this field. */
  website?: string;
}

export interface StudioMessage {
  kind: StudioMessageKind;
  name: string;
  email: string;
  service: string;
  details: string;
  rating: string;
  budget: string;
  musicLink: string;
  preferredContact: string;
}

const LIMITS: Record<string, number> = {
  name: 100,
  email: 255,
  service: 120,
  details: 2000,
  rating: 20,
  budget: 60,
  musicLink: 300,
  preferredContact: 40,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const GENERIC_ERROR = 'We could not read your message. Please try again.';
const NOT_SENT_ERROR = 'Your message was not sent.';

/** Strip line breaks so no submitted value can inject an extra email header. */
function clean(value: unknown, key: keyof typeof LIMITS): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .slice(0, LIMITS[key]);
}

export type ParsedMessage = { ok: true; message: StudioMessage } | { ok: false; error: string };

export function parseStudioMessage(raw: unknown): ParsedMessage {
  if (typeof raw !== 'object' || raw === null) return { ok: false, error: GENERIC_ERROR };
  const src = raw as Record<string, unknown>;
  if (typeof src['website'] === 'string' && src['website'].trim() !== '') {
    return { ok: false, error: NOT_SENT_ERROR };
  }
  const kind: StudioMessageKind | null =
    src['kind'] === 'review' ? 'review' : src['kind'] === 'project' ? 'project' : null;
  if (!kind) return { ok: false, error: GENERIC_ERROR };

  const message: StudioMessage = {
    kind,
    name: clean(src['name'], 'name'),
    email: clean(src['email'], 'email'),
    service: clean(src['service'], 'service'),
    details: clean(src['details'], 'details'),
    rating: clean(src['rating'], 'rating'),
    budget: clean(src['budget'], 'budget'),
    musicLink: clean(src['musicLink'], 'musicLink'),
    preferredContact: clean(src['preferredContact'], 'preferredContact'),
  };

  if (message.name.length < 2) return { ok: false, error: 'Please enter your name.' };
  if (message.service === '') return { ok: false, error: 'Please choose a service.' };
  if (message.details.length < 10) {
    return { ok: false, error: 'Please tell us a little more — at least a short sentence.' };
  }
  if (message.email !== '' && !EMAIL_RE.test(message.email)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  if (kind === 'project' && message.email === '') {
    return { ok: false, error: 'Please add your email so we can reply.' };
  }
  if (kind === 'review' && message.rating === '') {
    return { ok: false, error: 'Please choose a star rating.' };
  }
  if (message.musicLink !== '' && !/^https?:\/\//i.test(message.musicLink)) {
    return { ok: false, error: 'Please enter a link that starts with http.' };
  }
  return { ok: true, message };
}

function base64Std(input: string): string {
  let binary = '';
  for (const byte of new TextEncoder().encode(input)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64Url(input: string): string {
  return base64Std(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Non-ASCII header values need RFC 2047 encoding or they arrive as mojibake. */
function encodeHeader(value: string): string {
  if (/^[\x00-\x7F]*$/.test(value)) return value;
  return `=?UTF-8?B?${base64Std(value)}?=`;
}

export function buildStudioMessageEmail(
  message: StudioMessage,
  inbox: string = studioEmail,
): { subject: string; raw: string } {
  const subject =
    message.kind === 'review'
      ? `Review for Teamlex Studio: ${message.service}`
      : `Teamlex Studio project inquiry — ${message.service}`;

  const lines = ['Hello Teamlex Studio,', '', `Name: ${message.name}`];
  if (message.email) lines.push(`Email: ${message.email}`);
  lines.push(`${message.kind === 'review' ? 'Service received' : 'Service'}: ${message.service}`);
  if (message.rating) lines.push(`Rating: ${message.rating}`);
  if (message.budget) lines.push(`Budget: ${message.budget}`);
  if (message.preferredContact) lines.push(`Preferred contact: ${message.preferredContact}`);
  if (message.musicLink) lines.push(`Music link: ${message.musicLink}`);
  lines.push(
    '',
    message.kind === 'review' ? 'Review:' : 'Project details:',
    message.details,
    '',
    'Sent from the Teamlex Studio website.',
  );

  const headers = [
    `To: ${inbox}`,
    `Subject: ${encodeHeader(subject)}`,
    ...(message.email && EMAIL_RE.test(message.email) ? [`Reply-To: ${message.email}`] : []),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 8bit',
  ];

  return { subject, raw: base64Url(`${headers.join('\r\n')}\r\n\r\n${lines.join('\r\n')}`) };
}
