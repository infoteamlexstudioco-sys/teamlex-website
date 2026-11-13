import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactCta, SiteLayout } from '@/components/site-layout';
import { StudioForm } from '@/components/studio-forms';
import { testimonials } from '@/lib/teamlex';

export const Route = createFileRoute('/reviews')({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: 'Artist Reviews — Teamlex Studio' },
    { name: 'description', content: 'What artists say about working with Teamlex Studio. Share your own experience — reviews are read by our team and never published automatically.' },
    { property: 'og:title', content: 'Artist Reviews — Teamlex Studio' },
    { property: 'og:description', content: 'What artists say about working with Teamlex Studio.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:url', content: 'https://studio-echo-testimonials.lovable.app/reviews' },
  ], links: [{ rel: 'canonical', href: 'https://studio-echo-testimonials.lovable.app/reviews' }] }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const [form, setForm] = useState<'project' | 'review' | null>(null);
  return <SiteLayout>
    <section className="site-container section page-intro"><span className="eyebrow">ARTIST FEEDBACK</span><h1>What artists say about<br />Teamlex Studio.</h1><p>Real experiences from the artists we work with. Submitted reviews are read by our team first and are not published automatically.</p><div className="hero-actions"><Button size="lg" onClick={() => setForm('review')}>Share Your Experience <ArrowUpRight /></Button></div></section>
    <section className="site-container section">{testimonials.length ? <div className="reviews-grid">{testimonials.map((r,i) => <article className="review-card" key={i}><span role="img" aria-label={`${r.rating} out of 5 stars`}>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span><blockquote>{r.text}</blockquote><strong>{r.name}</strong>{r.service && <p>{r.service}</p>}{r.source && <p>Review from {r.source}</p>}{r.verified && <span>Platform verified</span>}</article>)}</div> : <div className="review-empty"><MessageSquare size={26} /><div><h2>Your experience matters.</h2><p>More reviews coming soon. Worked with Teamlex Studio? We’d love to hear your story.</p></div></div>}<p className="review-note">Submitted reviews are read by our team first and are not published automatically.</p></section>
    <ContactCta />
    <StudioForm kind={form} service="" onClose={() => setForm(null)} />
  </SiteLayout>;
}
