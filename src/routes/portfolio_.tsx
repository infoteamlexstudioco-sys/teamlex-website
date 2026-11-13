import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactCta, SiteLayout } from '@/components/site-layout';
import { projects } from '@/lib/teamlex';

export const Route = createFileRoute('/portfolio_')({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: 'Portfolio — Teamlex Studio' },
    { name: 'description', content: 'Selected visual and creative concepts from Teamlex Studio. Concept projects are clearly labeled as demos.' },
    { property: 'og:title', content: 'Portfolio — Teamlex Studio' },
    { property: 'og:description', content: 'Selected visual and creative concepts from Teamlex Studio.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:url', content: 'https://studio-echo-testimonials.lovable.app/portfolio' },
  ], links: [{ rel: 'canonical', href: 'https://studio-echo-testimonials.lovable.app/portfolio' }] }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return <SiteLayout>
    <section className="site-container section page-intro"><span className="eyebrow">SELECTED VISUALS</span><h1>Concepts with a<br />cinematic eye.</h1><p>A look at the kind of creative work we love to make. Projects shown here are concept pieces, clearly labeled — real client work will join them soon.</p></section>
    <section className="site-container section"><div className="services-grid">{projects.map(p => <article className="service-card project-card" key={p.slug}><img className="project-cover" src={p.cover} alt={`Concept cover art for ${p.title}`} loading="lazy" width={1024} height={1024} /><div className="service-card-top"><span>{p.category}</span>{p.demo && <span className="demo-badge">Concept / Demo</span>}</div><h3>{p.title}</h3><p>{p.concept}</p><Button variant="link" asChild className="service-link"><Link to="/portfolio/$slug" params={{ slug: p.slug }}>View project <ArrowUpRight /></Link></Button></article>)}</div></section>
    <ContactCta />
  </SiteLayout>;
}
