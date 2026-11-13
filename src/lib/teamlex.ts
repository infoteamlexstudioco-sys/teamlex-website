export const studioEmail = 'teamlexstudio877@gmail.com';

export interface Service {
  name: string;
  slug: string;
  icon: string;
  category: string;
  text: string;
  forWhom: string;
  includes: string[];
  clientProvides: string[];
  process: string[];
}

export const services: Service[] = [
  {
    name: 'Music Promotion', slug: 'music-promotion', icon: 'megaphone', category: 'STRATEGY',
    text: 'Release campaigns, promotional content planning, audience-development ideas and outreach strategies designed around your sound and goals.',
    forWhom: 'Independent artists preparing a single, EP or album who want a clear, realistic promotional plan instead of guessing what to post and when.',
    includes: ['Release campaign planning tailored to your track and audience', 'Promotional content ideas and posting structure', 'Audience-development and outreach strategy', 'A realistic timeline with clear next steps'],
    clientProvides: ['Your track or release (finished or in progress)', 'Your artist profiles and current channels', 'Your goals, budget range and timeline'],
    process: ['We listen to your music and discuss your goals.', 'We shape a campaign direction and agree scope together.', 'We build the plan and support you through the release window.'],
  },
  {
    name: 'Music Videos & AI Visuals', slug: 'music-videos-ai-visuals', icon: 'film', category: 'VISUALS',
    text: 'Cinematic music videos, realistic AI visuals, lyric videos, visualizers, teasers and visual concepts that give your track a world of its own.',
    forWhom: 'Artists who want their music to look as strong as it sounds — from a full cinematic video to realistic AI visuals, lyric videos and teasers.',
    includes: ['Creative concept and visual direction for your track', 'Cinematic music video or realistic AI visual production', 'Lyric videos, visualizers and teaser cuts', 'Delivery in formats ready for your platforms'],
    clientProvides: ['The final audio file of your track', 'Any references, moods or ideas you like', 'Your artist branding assets, if you have them'],
    process: ['You share the track and your visual ideas.', 'We propose a concept and agree the scope.', 'We produce the visuals and refine them with your feedback.'],
  },
  {
    name: 'Mixing & Mastering', slug: 'mixing-mastering', icon: 'audio', category: 'SOUND',
    text: 'Polished audio finishing, mastering support and release-ready file preparation to help your music translate across listening environments.',
    forWhom: 'Artists and producers who have a recorded track and want it to sound polished, balanced and release-ready across speakers, headphones and streaming platforms.',
    includes: ['Mixing support to balance and polish your track', 'Mastering for a consistent, release-ready sound', 'Release-ready file preparation and formats', 'Revision rounds agreed before work begins'],
    clientProvides: ['Your multitrack stems or stereo mix', 'Reference tracks whose sound you admire', 'Notes on anything you want changed or kept'],
    process: ['You send your files and references.', 'We mix and master with your direction in mind.', 'We refine together until the track is ready to release.'],
  },
  {
    name: 'Artist Branding', slug: 'artist-branding', icon: 'sparkles', category: 'IDENTITY',
    text: 'Artist bios, press-kit support, visual identity direction, profile consistency and a stronger online presence for your next chapter.',
    forWhom: 'Artists who want a consistent, professional identity — a clear bio, a coherent look and profiles that tell the same story everywhere.',
    includes: ['Artist bio writing and refinement', 'Press-kit support and structure', 'Visual identity direction and profile consistency', 'A stronger, more coherent online presence'],
    clientProvides: ['Your story, influences and goals', 'Existing photos, logos and profiles', 'Any bios or press materials you already have'],
    process: ['We talk through your story and identity.', 'We shape your bio, press kit and visual direction.', 'We align your profiles so everything feels like one artist.'],
  },
  {
    name: 'Google Knowledge Panel Guidance', slug: 'google-knowledge-panel-guidance', icon: 'search', category: 'PRESENCE',
    text: "Help preparing credible artist information, sources and online profiles that may support Google's entity understanding and eligibility review.",
    forWhom: 'Artists building a credible online footprint who want their public information organized clearly. Google alone decides whether a Knowledge Panel appears — we help you prepare, never promise.',
    includes: ['A review of your current online presence and profiles', 'Guidance on credible sources and consistent artist information', 'Help organizing the details Google uses to understand entities', 'Honest expectations about eligibility and timing'],
    clientProvides: ['Links to your existing profiles and mentions', 'Accurate biographical and discography information', 'Any press coverage or verified profiles you have'],
    process: ['We audit your current presence.', 'We identify gaps and organize credible information.', 'You strengthen your footprint while Google makes its own determination.'],
  },
  {
    name: 'Sync Licensing Readiness', slug: 'sync-licensing-readiness', icon: 'music', category: 'OPPORTUNITIES',
    text: 'Organize metadata, rights information and pitch materials to prepare music for possible film, TV, advertising, gaming and digital-media opportunities.',
    forWhom: 'Artists and producers who want their catalog organized and pitch-ready for potential film, TV, advertising and gaming opportunities — without false promises of placements.',
    includes: ['Metadata and rights-information organization', 'Pitch-material preparation for your catalog', 'Guidance on how sync licensing works', 'A readiness checklist for your tracks'],
    clientProvides: ['Your tracks and who owns what (splits, rights)', 'Existing metadata and release information', 'Your goals for licensing your music'],
    process: ['We review your catalog and rights situation.', 'We organize metadata and prepare pitch materials.', 'Your music is ready to present when opportunities appear.'],
  },
  {
    name: 'Release & Distribution Support', slug: 'release-distribution-support', icon: 'release', category: 'RELEASE',
    text: 'Practical release planning, platform profile guidance, content checklists and coordination so the details around your release feel less overwhelming.',
    forWhom: 'Artists who want a release to feel organized instead of overwhelming — with a plan, a checklist and someone keeping the details on track.',
    includes: ['A practical release plan and timeline', 'Platform profile guidance (streaming and social)', 'Content checklists so nothing is forgotten', 'Coordination support through release week'],
    clientProvides: ['Your finished track and artwork', 'Your distributor and platform details', 'Your preferred release date and goals'],
    process: ['We map out your release timeline together.', 'We prepare profiles, assets and checklists.', 'We support you through release day and beyond.'],
  },
  {
    name: 'Artist Development', slug: 'artist-development', icon: 'artist', category: 'DIRECTION',
    text: 'Creative direction, project planning and a clearer next-step roadmap tailored to your goals, identity, audience and stage of growth.',
    forWhom: 'Artists at any stage who want honest creative direction and a clear roadmap — what to focus on next, and why.',
    includes: ['Creative direction sessions around your music and identity', 'Project planning for your next release or chapter', 'A tailored next-step roadmap', 'Honest feedback on where you are and where to go'],
    clientProvides: ['Your music, demos and works in progress', 'Your goals, influences and concerns', 'Openness to honest, constructive feedback'],
    process: ['We listen and understand where you are.', 'We define direction and priorities together.', 'You leave with a roadmap you can actually follow.'],
  },
  {
    name: 'Custom Artist Projects', slug: 'custom-artist-projects', icon: 'plus', category: 'YOUR IDEA',
    text: "Have another music-related need? Tell us what you're working toward and we'll explore a practical scope, timeline and next step together.",
    forWhom: "Artists with a need that doesn't fit a standard service — a one-off idea, a combination of services, or something entirely your own.",
    includes: ['A conversation to understand your idea', 'A practical scope, deliverables and timeline', 'A combination of our services shaped around your need', 'Clear communication from start to finish'],
    clientProvides: ['A description of what you want to achieve', 'Any relevant music, assets or references', 'Your budget range and ideal timeline'],
    process: ['You tell us what you are working toward.', 'We explore scope, timeline and next steps together.', 'We agree the plan and get to work.'],
  },
];

import coverMidnight from '@/assets/cover-midnight-frequency.jpg';
import coverFirstLight from '@/assets/cover-first-light-ep.jpg';
import coverNorthern from '@/assets/cover-northern-soul.jpg';
import coverScreenReady from '@/assets/cover-screen-ready.jpg';

export interface Project {
  title: string;
  slug: string;
  category: string;
  concept: string;
  servicesUsed: string[];
  demo: boolean;
  cover: string;
}

// Placeholder concept projects until real client work is supplied. Every entry
// is labeled "Concept / Demo" on the site — none are presented as client work.
// Cover art is original generated concept art, not a real release cover.
export const projects: Project[] = [
  {
    title: 'Midnight Frequency', slug: 'midnight-frequency', category: 'Music Video & AI Visuals', demo: true, cover: coverMidnight,
    concept: 'A cinematic concept video for a late-night electronic track — neon cityscapes, realistic AI-generated performance shots and a visualizer cut for social teasers.',
    servicesUsed: ['Music Videos & AI Visuals', 'Music Promotion'],
  },
  {
    title: 'First Light EP', slug: 'first-light-ep', category: 'Release Campaign', demo: true, cover: coverFirstLight,
    concept: 'A concept release plan for a debut EP: a six-week content calendar, platform profile refresh, lyric videos for two singles and a press-ready artist bio.',
    servicesUsed: ['Release & Distribution Support', 'Artist Branding', 'Music Videos & AI Visuals'],
  },
  {
    title: 'Northern Soul', slug: 'northern-soul', category: 'Mixing & Mastering', demo: true, cover: coverNorthern,
    concept: 'A concept audio-finishing project: mixing and mastering a three-track acoustic session so it translates warmly across headphones, cars and streaming.',
    servicesUsed: ['Mixing & Mastering'],
  },
  {
    title: 'Screen Ready', slug: 'screen-ready', category: 'Sync Licensing Readiness', demo: true, cover: coverScreenReady,
    concept: 'A concept sync-readiness package: cleaned-up metadata, documented rights splits and a pitch sheet preparing an indie catalog for film and TV opportunities.',
    servicesUsed: ['Sync Licensing Readiness', 'Artist Development'],
  },
];

export interface Testimonial {
  name: string; service?: string; rating: number; text: string;
  date?: string; country?: string; source?: string; verified: boolean;
}
// Add only exact reviews supported by supplied screenshots. Verification must
// be visibly indicated by the original platform, never inferred by the studio.
export const testimonials: Testimonial[] = [];

export const budgetOptions = ['Not sure yet', 'Under $100', '$100–$300', '$300–$750', '$750+', 'Let’s discuss'];

/** Social profiles. Fill in each url to show its icon in the footer; empty ones stay hidden. */
export const socialLinks: { name: 'Instagram' | 'TikTok' | 'YouTube' | 'Spotify'; url: string }[] = [
  { name: 'Instagram', url: '' },
  { name: 'TikTok', url: '' },
  { name: 'YouTube', url: '' },
  { name: 'Spotify', url: '' },
];
