import { useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Instagram, Menu, Music2, X, Youtube } from 'lucide-react';
import { StudioChat } from '@/components/studio-chat';
import logo from '@/assets/teamlex-logo.jpg.asset.json';
import { socialLinks } from '@/lib/teamlex';
import { Button } from '@/components/ui/button';
import { studioEmail } from '@/lib/teamlex';

export function Brand() {
  return <Link to="/" className="brand" aria-label="Teamlex Studio home"><img src={logo.url} alt="" className="brand-logo" width={44} height={44} /><span>TEAMLEX<span className="brand-sub">STUDIO</span></span></Link>;
}

const navItems: { name: string; to: string }[] = [
  { name: 'Services', to: '/services' },
  { name: 'Portfolio', to: '/portfolio' },
  { name: 'About', to: '/about' },
  { name: 'Reviews', to: '/reviews' },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  return <div className="studio-site">
    <header className="site-header"><div className="site-container header-inner"><Brand />
      <nav aria-label="Main navigation" className={menu ? 'main-nav is-open' : 'main-nav'}>
        {navItems.map(item => <Link key={item.to} to={item.to} onClick={() => setMenu(false)} activeProps={{ 'data-status': 'active' }}>{item.name}</Link>)}
      </nav>
      <div className="header-actions">
        <Button asChild className="header-cta"><Link to="/contact" search={{ service: "" }}>Start a Project <ArrowUpRight /></Link></Button>
        <Button variant="ghost" size="icon" className="mobile-menu" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button>
      </div>
    </div></header>
    <main>{children}</main>
    <footer>
      <div className="site-container footer-top"><Brand /><span>Turning sound into cinematic stories.</span>{socialLinks.some(l => l.url) ? <div className="footer-social" aria-label="Social media">{socialLinks.filter(l => l.url).map(l => { const Icon = l.name === 'Instagram' ? Instagram : l.name === 'YouTube' ? Youtube : Music2; return <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer" aria-label={`Teamlex Studio on ${l.name}`}><Icon size={16} /></a>; })}</div> : null}<Link to="/">Back to top <ArrowUpRight size={14} /></Link></div>
      <div className="site-container footer-bottom"><span>© 2026 Teamlex Studio. Founded by Thomas Art. All rights reserved.</span><div><Link to="/services">Services</Link><Link to="/about">About</Link><Link to="/reviews">Reviews</Link><Link to="/contact" search={{ service: "" }}>Contact</Link></div></div>
    </footer>
    <StudioChat />
  </div>;
}

export function ContactCta() {
  return <section className="contact-band"><div className="site-container contact-inner"><div><span className="eyebrow">LET’S MAKE YOUR NEXT MOVE</span><h2>Got a track?<br />Let’s talk.</h2><p>Tell us what you’re releasing, where you want to go and the support you need.</p></div><div className="contact-actions"><Button size="lg" asChild><Link to="/contact" search={{ service: "" }}>Start a Project <ArrowUpRight /></Link></Button><a href={`mailto:${studioEmail}`}>{studioEmail}<ArrowUpRight size={16} /></a></div></div></section>;
}
