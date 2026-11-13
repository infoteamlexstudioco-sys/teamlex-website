import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactCta, SiteLayout } from '@/components/site-layout';
import { services } from '@/lib/teamlex';
import { icons } from './services_';

function getService(slug: string) {
  const service = services.find(s => s.slug === slug);
  if (!service) throw notFound();
  return service;
}

export const Route = createFileRoute('/services/$slug')({
  staticData: { sitemap: true },
  loader: ({ params }) => getService(params.slug),
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.name ?? 'Service'} — Teamlex Studio` },
    { name: 'description', content: loaderData?.text ?? 'Creative services for independent artists.' },
    { property: 'og:title', content: `${loaderData?.name ?? 'Service'} — Teamlex Studio` },
    { property: 'og:description', content: loaderData?.text ?? '' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:url', content: `https://studio-echo-testimonials.lovable.app/services/${loaderData?.slug ?? ''}` },
  ], links: [{ rel: 'canonical', href: `https://studio-echo-testimonials.lovable.app/services/${loaderData?.slug ?? ''}` }] }),
  component: ServicePage,
  notFoundComponent: () => <SiteLayout><section className="site-container section page-intro"><h1>Service not found</h1><p>That service doesn’t exist. Explore all of our services instead.</p><Button asChild><Link to="/services">All Services <ArrowUpRight /></Link></Button></section></SiteLayout>,
});

function ServicePage() {
  const service = Route.useLoaderData();
  const Icon = icons[service.icon as keyof typeof icons];
  return <SiteLayout>
    <section className="site-container section page-intro">
      <Button variant="link" asChild className="back-link"><Link to="/services"><ArrowLeft /> All services</Link></Button>
      <span className="eyebrow">{service.category}</span>
      <h1><Icon size={40} aria-hidden="true" /> {service.name}</h1>
      <p>{service.text}</p>
      <div className="hero-actions"><Button size="lg" asChild><Link to="/contact" search={{ service: service.name }}>Get a Quote <ArrowUpRight /></Link></Button></div>
      <p className="text-muted-foreground text-sm">Scope, deliverables and pricing are agreed before work begins. [Pricing to be confirmed]</p>
    </section>
    <section className="site-container section detail-grid">
      <article className="service-card"><h2>Who it’s for</h2><p>{service.forWhom}</p></article>
      <article className="service-card"><h2>What’s included</h2><ul className="check-list">{service.includes.map(t => <li key={t}><Check size={16} />{t}</li>)}</ul></article>
      <article className="service-card"><h2>What you provide</h2><ul className="check-list">{service.clientProvides.map(t => <li key={t}><Check size={16} />{t}</li>)}</ul></article>
    </section>
    <section className="site-container section"><div className="section-heading"><div><span className="eyebrow">THE PROCESS</span><h2>How it works.</h2></div></div><div className="steps">{service.process.map((step, i) => <article key={step} className="step"><span className="step-number">0{i + 1}</span><p>{step}</p></article>)}</div></section>
    <ContactCta />
  </SiteLayout>;
}
