import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, AudioLines, Film, Megaphone, Music2, Plus, Search, Sparkles, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactCta, SiteLayout } from '@/components/site-layout';
import { services } from '@/lib/teamlex';

export const icons = { megaphone: Megaphone, film: Film, audio: AudioLines, sparkles: Sparkles, search: Search, music: Music2, release: ArrowUpRight, artist: UserRound, plus: Plus };

export const Route = createFileRoute('/services_')({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: 'Services — Teamlex Studio' },
    { name: 'description', content: 'Music promotion, cinematic music videos and AI visuals, mixing and mastering, artist branding, release support and more for independent artists.' },
    { property: 'og:title', content: 'Services — Teamlex Studio' },
    { property: 'og:description', content: 'One creative partner for your sound, your visuals and the strategy around your music.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:url', content: 'https://studio-echo-testimonials.lovable.app/services' },
  ], links: [{ rel: 'canonical', href: 'https://studio-echo-testimonials.lovable.app/services' }] }),
  component: ServicesPage,
});

function ServicesPage() {
  return <SiteLayout>
    <section className="site-container section page-intro"><span className="eyebrow">THE SERVICES</span><h1>Everything your next<br />release needs.</h1><p>One creative partner for your sound, your visuals and the strategy around your music. Every engagement starts with a conversation — scope, deliverables and pricing are agreed before work begins. [Pricing to be confirmed]</p></section>
    <section className="site-container section"><div className="services-grid">{services.map((s) => { const Icon = icons[s.icon as keyof typeof icons]; return <article className="service-card" key={s.slug}><div className="service-card-top"><Icon size={25} /><span>{s.category}</span></div><h3>{s.name}</h3><p>{s.text}</p><Button variant="link" asChild className="service-link"><Link to="/services/$slug" params={{ slug: s.slug }}>Explore this service <ArrowUpRight /></Link></Button></article>; })}</div></section>
    <ContactCta />
  </SiteLayout>;
}
