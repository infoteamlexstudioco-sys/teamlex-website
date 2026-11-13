import { useServerFn } from '@tanstack/react-start';
import { useState, type FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sendStudioMessage } from '@/lib/studio-message.functions';
import { services, studioEmail } from '@/lib/teamlex';

export function StudioForm({ kind, service, onClose }: { kind: 'project' | 'review' | null; service: string; onClose: () => void }) {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [rating, setRating] = useState(0);
  const review = kind === 'review';
  const sendMessage = useServerFn(sendStudioMessage);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setError('');
    setStatus('');
    const data = new FormData(form);
    const fields: Record<string, string> = {};
    data.forEach((value, key) => { fields[key] = String(value); });
    setBusy(true);
    try {
      const result = await sendMessage({ data: {
        kind: review ? 'review' : 'project',
        name: fields['Name'] ?? '',
        email: fields['Email'] ?? '',
        service: fields['Service'] ?? '',
        details: (review ? fields['Review'] : fields['Project details']) ?? '',
        rating: review ? `${rating} out of 5 stars` : '',
        budget: fields['Budget'] ?? '',
        musicLink: fields['Music link'] ?? '',
        preferredContact: fields['Preferred contact'] ?? '',
        website: fields['website'] ?? '',
      } });
      if (result.ok) {
        form.reset();
        setRating(0);
        setStatus(review
          ? 'Thank you! Your review reached the studio. Reviews are checked by hand and are not published automatically.'
          : 'Thank you! Your inquiry reached the studio. We’ll reply to the email you gave us.');
      } else {
        setError(result.error);
      }
    } catch {
      setError(`Your message could not be delivered. Please email ${studioEmail}.`);
    } finally {
      setBusy(false);
    }
  }
  return <Dialog.Root open={kind !== null} onOpenChange={(open) => { if (!open) onClose(); setStatus(''); setError(''); setRating(0); }}>
    <Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="studio-dialog" aria-describedby="form-description">
      <span className="eyebrow">{review ? 'ARTIST FEEDBACK' : 'YOUR NEXT CHAPTER'}</span>
      <Dialog.Title className="dialog-title">{review ? 'Tell us how it went.' : 'Let’s talk about your music.'}</Dialog.Title>
      <Dialog.Description id="form-description" className="text-muted-foreground text-sm leading-relaxed">{review ? 'Reviews go straight to the studio and are not published automatically.' : 'Share your ideas. Your message goes straight to the studio.'}</Dialog.Description>
      <Dialog.Close asChild><Button variant="ghost" size="icon" className="dialog-close" aria-label="Close form"><X /></Button></Dialog.Close>
      <form onSubmit={submit} key={`${kind}-${service}`} className="studio-form">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
        <div className="form-columns"><label>Name or artist name *<input autoComplete="name" name="Name" required placeholder="Your name" /></label>
        {!review && <label>Your email *<input name="Email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>}</div>
        <label>{review ? 'Service received *' : 'Service you’re interested in *'}<select name="Service" required defaultValue={service}><option value="">Choose a service</option>{services.map(s => <option key={s.name}>{s.name}</option>)}{!review && <option>Not sure yet — let’s discuss</option>}</select></label>
        {review ? <fieldset><legend>Star rating *</legend><div className="rating-input">{[1,2,3,4,5].map(n => <label key={n} className={n <= rating ? 'selected' : ''}><input type="radio" name="Rating" value={n} required checked={rating === n} onChange={() => setRating(n)} aria-label={`${n} out of 5 stars`} /><Star aria-hidden="true" /></label>)}<span>{rating ? `${rating} / 5` : 'Choose a rating'}</span></div></fieldset> : <label>Estimated budget<select name="Budget"><option>Not sure yet</option><option>Under $100</option><option>$100–$300</option><option>$300–$750</option><option>$750+</option><option>Let’s discuss</option></select></label>}
        <label>{review ? 'Your review *' : 'Tell us about your project *'}<textarea name={review ? 'Review' : 'Project details'} required placeholder={review ? 'Share your experience…' : 'Your sound, your ideas, your next move…'} rows={4} /></label>
        <label>Artist profile or music link (optional)<input type="url" name="Music link" placeholder="https://" /></label>
        <Button type="submit" size="lg" className="w-full" disabled={busy}>{busy ? 'Sending…' : review ? 'Send Review' : 'Send Inquiry'}<ArrowUpRight /></Button>
        <p className="text-xs text-muted-foreground leading-relaxed">Your message goes straight to the studio’s inbox. Prefer to write yourself? Email <a className="text-primary underline" href={`mailto:${studioEmail}`}>{studioEmail}</a>.</p>
        {error && <p role="alert" className="text-destructive text-sm">{error}</p>}
        <p role="status" className="text-primary text-sm leading-relaxed">{status}</p>
      </form>
    </Dialog.Content></Dialog.Portal>
  </Dialog.Root>;
}