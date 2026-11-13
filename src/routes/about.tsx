import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, AudioLines, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactCta, SiteLayout } from '@/components/site-layout';
import artistVisual from '@/assets/artist-visual.jpg';

export const Route = createFileRoute('/about')({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: 'About — Teamlex Studio' },
    { name: 'description', content: 'Teamlex Studio believes the music comes first. Creative services, honest expectations and a clear next move for independent artists.' },
    { property: 'og:title', content: 'About — Teamlex Studio' },
    { property: 'og:description', content: 'Creative ambition. Realistic expectations. The music comes first.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:url', content: 'https://studio-echo-testimonials.lovable.app/about' },
  ], links: [{ rel: 'canonical', href: 'https://studio-echo-testimonials.lovable.app/about' }] }),
  component: AboutPage,
});

function AboutPage() {
  return <SiteLayout>
    <section className="about-band"><div className="site-container about-grid"><div className="artist-image-wrap"><img loading="lazy" src={artistVisual} width={1536} height={1024} alt="Illustrative cinematic portrait of a singer recording vocals" /><div className="image-caption"><span>THE MUSIC COMES FIRST.</span><AudioLines /></div></div><div><span className="eyebrow">THE STUDIO</span><h1>Your sound deserves<br />a world of its own.</h1><p>At Teamlex Studio, we believe the music comes first. The right visual, release plan and artist presentation can help listeners connect with the story behind a track.</p><p><strong>Founded by Thomas Art.</strong></p><p>We bring creative services together so independent artists can approach their next release with more clarity, intention and a consistent identity.</p><ul className="check-list">{['Creative direction shaped around your music','Clear project scope, deliverables and timelines','Flexible support for artists at different stages','Honest expectations — no guaranteed fame or results'].map(t => <li key={t}><Check size={16} />{t}</li>)}</ul><Button asChild variant="outline" size="lg"><Link to="/contact" search={{ service: "" }}>Let’s Build Your Next Move <ArrowUpRight /></Link></Button></div></div></section>
    <section className="site-container principles"><div><span className="eyebrow">OUR PROMISE</span><h2>Creative ambition.<br />Realistic expectations.</h2><p>Music careers take time. We focus on useful creative work and clear communication — never empty promises.</p></div><div className="principle-grid">{[{ title:'Artist-first', text:'Your sound, goals and identity guide the creative direction.' },{ title:'Transparent', text:'Scope, fees and deliverables are discussed before work starts.' },{ title:'Rights-aware', text:'Licensing and distribution begin with clarity around ownership and permissions.' },{ title:'No false guarantees', text:'Promotion outcomes, Google panels and sync placements depend on factors outside any studio’s control.' }].map(p => <div key={p.title}><Check size={16} /><h3>{p.title}</h3><p>{p.text}</p></div>)}</div></section>
    <ContactCta />
  </SiteLayout>;
}
