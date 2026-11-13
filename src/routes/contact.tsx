import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteLayout } from '@/components/site-layout';
import { sendStudioMessage } from '@/lib/studio-message.functions';
import { budgetOptions, services, studioEmail } from '@/lib/teamlex';

export const Route = createFileRoute('/contact')({
  staticData: { sitemap: true },
  validateSearch: (search: Record<string, unknown>) => ({ service: typeof search['service'] === 'string' ? search['service'] : '' }),
  head: () => ({ meta: [
    { title: 'Contact — Start a Project with Teamlex Studio' },
    { name: 'description', content: 'Tell Teamlex Studio about your track, your goals and the support you need. Your message lands straight in the studio’s inbox.' },
    { property: 'og:title', content: 'Contact — Start a Project with Teamlex Studio' },
    { property: 'og:description', content: 'Tell us what you’re releasing and where you want to go.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:url', content: 'https://studio-echo-testimonials.lovable.app/contact' },
  ], links: [{ rel: 'canonical', href: 'https://studio-echo-testimonials.lovable.app/contact' }] }),
  component: ContactPage,
});

function ContactPage() {
  const { service } = Route.useSearch();
  const sendMessage = useServerFn(sendStudioMessage);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setError('');
    setStatus('');
    const data = new FormData(form);
    const fields: Record<string, string> = {};
    data.forEach((value, key) => { fields[key] = String(value).trim(); });
    setBusy(true);
    try {
      const result = await sendMessage({ data: {
        kind: 'project',
        name: fields['Name'] ?? '',
        email: fields['Email'] ?? '',
        service: fields['Service'] ?? '',
        details: fields['Project details'] ?? '',
        budget: fields['Budget'] ?? '',
        musicLink: fields['Music link'] ?? '',
        preferredContact: fields['Preferred contact'] ?? '',
        website: fields['website'] ?? '',
      } });
      if (result.ok) {
        form.reset();
        setStatus('Your inquiry has been sent to Teamlex Studio. We’ll reply to the email you gave us.');
      } else {
        setError(result.error);
      }
    } catch {
      setError(`Your message could not be delivered. Please email ${studioEmail}.`);
    } finally {
      setBusy(false);
    }
  }
  return <SiteLayout>
    <section className="site-container section page-intro"><span className="eyebrow">YOUR NEXT CHAPTER</span><h1>Got a track?<br />Let’s talk.</h1><p>Tell us what you’re releasing, where you want to go and the support you need. Your message lands straight in the studio’s inbox.</p></section>
    <section className="site-container section contact-section">
      <form onSubmit={submit} className="studio-form contact-form" key={service}>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
        <div className="form-columns">
          <label>Name or artist name *<input autoComplete="name" name="Name" required maxLength={100} placeholder="Your name" /></label>
          <label>Your email *<input name="Email" type="email" autoComplete="email" required maxLength={255} placeholder="you@example.com" /></label>
        </div>
        <div className="form-columns">
          <label>Service you’re interested in *<select name="Service" required defaultValue={service}><option value="">Choose a service</option>{services.map(s => <option key={s.name}>{s.name}</option>)}<option>Not sure yet — let’s discuss</option></select></label>
          <label>Estimated budget<select name="Budget">{budgetOptions.map(b => <option key={b}>{b}</option>)}</select></label>
        </div>
        <label>Artist profile or track link (optional)<input type="url" name="Music link" maxLength={300} placeholder="https://" /></label>
        <label>Tell us about your project *<textarea name="Project details" required maxLength={2000} placeholder="Your sound, your ideas, your next move…" rows={5} /></label>
        <fieldset><legend>Preferred contact method</legend><div className="rating-input contact-methods">{['Email', 'Video call', 'Either is fine'].map(m => <label key={m}><input type="radio" name="Preferred contact" value={m} defaultChecked={m === 'Email'} />{m}</label>)}</div></fieldset>
        <Button type="submit" size="lg" className="w-full" disabled={busy}>{busy ? 'Sending…' : 'Send Inquiry'}<ArrowUpRight /></Button>
        <p className="text-xs text-muted-foreground leading-relaxed">Your message goes straight to the studio’s inbox. Prefer to write yourself? Email <a className="text-primary underline" href={`mailto:${studioEmail}`}>{studioEmail}</a>.</p>
        {error && <p role="alert" className="text-destructive text-sm">{error}</p>}
        {status && <p role="status" className="text-primary text-sm leading-relaxed">{status}</p>}
      </form>
    </section>
  </SiteLayout>;
}
