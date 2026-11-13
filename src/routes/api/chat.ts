import { createFileRoute } from '@tanstack/react-router';
import { createOpenAI } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import { services, studioEmail } from '@/lib/teamlex';

const SYSTEM = `You are "Lex", the friendly assistant for Teamlex Studio (Teamlex Music Promotion), a creative studio for independent artists. Tagline: "Turning Sound Into Cinematic Stories."
Services: ${services.map(s => `${s.name} (page: /services/${s.slug}) — ${s.text}`).join('; ')}.
Rules: Be short, warm and helpful. Never invent prices (say pricing is confirmed per project), clients, awards, statistics or phone numbers. Never promise streams, fame, playlist or sync placements, or Google Knowledge Panels. To start a project, point people to the contact page (/contact) or email ${studioEmail}.`;

export const Route = createFileRoute('/api/chat')({
  staticData: { sitemap: false },
  server: { handlers: { POST: async ({ request }) => {
    const apiKey = process.env['LOVABLE_API_KEY'];
    if (!apiKey) return Response.json({ error: 'Assistant is not configured.' }, { status: 500 });
    const body = (await request.json().catch(() => null)) as { messages?: UIMessage[] } | null;
    const messages = Array.isArray(body?.messages) ? body.messages.slice(-30) : [];
    const openai = createOpenAI({
      baseURL: 'https://ai.gateway.lovable.dev/v1', apiKey,
      headers: { 'Lovable-API-Key': apiKey, 'X-Lovable-AIG-SDK': 'vercel-ai-sdk' },
    });
    const result = streamText({
      model: openai.responses('openai/gpt-6-astra'),
      system: SYSTEM,
      messages: await convertToModelMessages(messages),
      maxRetries: 0,
      abortSignal: request.signal,
      providerOptions: { openai: { forceReasoning: true, reasoningEffort: 'low', reasoningSummary: 'auto', store: false, include: ['reasoning.encrypted_content'] } },
    });
    return result.toUIMessageStreamResponse({ onError: () => 'The assistant is unavailable right now. Please use the contact form.' });
  } } },
});
