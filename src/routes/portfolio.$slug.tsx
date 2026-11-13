import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactCta, SiteLayout } from '@/components/site-layout';
import { projects } from '@/lib/teamlex';

function getProject(slug: string) {
  const project = projects.find(p => p.slug === slug);
  if (!project) throw notFound();
  return project;
}

export const Route = createFileRoute('/portfolio/$slug')({
  staticData: { sitemap: true },
  loader: ({ params }) => getProject(params.slug),
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.title ?? 'Project'} — Teamlex Studio Portfolio` },
    { name: 'description', content: loaderData?.concept ?? 'A Teamlex Studio creative project.' },
    { property: 'og:title', content: `${loaderData?.title ?? 'Project'} — Teamlex Studio` },
    { property: 'og:description', content: loaderData?.concept ?? '' },
    { property: 'og:type', content: 'article' }, { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:url', content: `https://studio-echo-testimonials.lovable.app/portfolio/${loaderData?.slug ?? ''}` },
  ], links: [{ rel: 'canonical', href: `https://studio-echo-testimonials.lovable.app/portfolio/${loaderData?.slug ?? ''}` }] }),
  component: ProjectPage,
  notFoundComponent: () => <SiteLayout><section className="site-container section page-intro"><h1>Project not found</h1><p>That project doesn’t exist. Browse the portfolio instead.</p><Button asChild><Link to="/portfolio">View Portfolio <ArrowUpRight /></Link></Button></section></SiteLayout>,
});

function ProjectPage() {
  const project = Route.useLoaderData();
  return <SiteLayout>
    <section className="site-container section page-intro">
      <Button variant="link" asChild className="back-link"><Link to="/portfolio"><ArrowLeft /> Portfolio</Link></Button>
      <span className="eyebrow">{project.category}</span>
      <h1>{project.title}</h1>
      {project.demo && <p><span className="demo-badge">Concept / Demo</span></p>}
      <p>{project.concept}</p>
    </section>
    <section className="site-container section project-cover-section"><img className="project-cover project-cover-large" src={project.cover} alt={`Concept cover art for ${project.title} — concept art, not a real release cover`} width={1024} height={1024} /></section>
    <section className="site-container section"><article className="service-card"><h2>Services used</h2><ul className="check-list">{project.servicesUsed.map(s => <li key={s}><Check size={16} />{s}</li>)}</ul></article></section>
    <section className="site-container section"><div className="hero-actions"><Button size="lg" asChild><Link to="/contact" search={{ service: project.servicesUsed[0] ?? '' }}>Create Something Similar <ArrowUpRight /></Link></Button></div></section>
    <ContactCta />
  </SiteLayout>;
}
