import React from 'react';
import './Experience.css';

const previousCompanies = [
  {
    id: 'trosky',
    company: 'Trosky 365',
    role: 'Lead Product Designer',
    period: '2023 — Present',
    location: 'Remote · Worldwide',
    theme: 'light',
    headline: 'Coach in Your Pocket',
    description: 'The conversational athletic training platform for youth baseball players. Transformed static daily assignment checklists into an AI-guided, multi-step interactive dialogue with Coach Nate & Coach Trosky. Led research, mobile interaction design, and rapid prototyping that lifted daily completed reps by ~30%.',
    websiteUrl: 'https://troskybaseball.com',
    websiteLabel: 'Visit Trosky 365',
    image: '/case-studies/trosky/42e00451045c32de61f9c68b53c46469d07f6129.jpg',
    imageAlt: 'Trosky 365 conversational coaching interface mockup',
    tags: ['Product Strategy', 'Conversational AI', 'iOS & Android', 'Design Systems'],
    accentColor: '#0071e3'
  },
  {
    id: 'recovery',
    company: 'Recovery Health',
    role: 'Senior Product Designer',
    period: '2022 — 2023',
    location: 'Clinical Systems · Hybrid',
    theme: 'dark',
    headline: 'Connected Rehabilitation Ecosystem',
    description: 'Post-operative clinical rehabilitation system linking orthopedic surgeons, physiotherapists, and recovering patients through shared telemetry. Engineered intuitive daily recovery plans, surgeon exception-monitoring dashboards, and connected clinical onboarding flows.',
    websiteUrl: 'https://www.figma.com/design/Mx3waiPzObcJFwYa37M6I4/Recovery-Re-Design?node-id=9245-9457',
    websiteLabel: 'View Case Study',
    image: '/case-studies/recovery/cover.png',
    imageAlt: 'Recovery rehabilitation platform and surgeon dashboard',
    tags: ['Clinical Telemetry', 'Multi-Role UX', 'Web & Tablet', 'Design Architecture'],
    accentColor: '#2997ff'
  },
  {
    id: 'independent',
    company: 'Independent Systems & Product Studio',
    role: 'Product & Interaction Designer',
    period: '2020 — 2022',
    location: 'Hyderabad, India · Worldwide',
    theme: 'slate',
    headline: 'Craft, Design Systems & Code Fidelity',
    description: 'Partnered with startup founders and engineering teams to design 0-to-1 product architectures, multi-platform token pipelines, and tactile micro-interactions. Focused on high-density productivity software and spatial desktop paradigms with front-end fidelity.',
    websiteUrl: 'https://github.com/yogeshbattula',
    websiteLabel: 'Explore Work',
    image: '/case-studies/recovery/transformation.png',
    imageAlt: 'Design system tokens and transformation architecture',
    tags: ['Design Systems', 'Tactile UI', 'Prototyping', 'Front-End Fidelity'],
    accentColor: '#34c759'
  }
];

export default function Experience({ onContact, onProjects }) {
  return (
    <div className="experience-timeline-container">
      {/* Apple-style Section Header */}
      <header className="experience-header">
        <span className="experience-badge">CAREER TIMELINE</span>
        <h1 className="experience-title">Here’s where I’ve crafted.</h1>
        <p className="experience-subtitle">
          Previous companies, core responsibilities, and product impact across athletic AI, healthtech, and spatial design systems.
        </p>
      </header>

      {/* Apple Feature Announcement-Style Cards Stack */}
      <div className="experience-cards-stack">
        {previousCompanies.map((item) => (
          <article
            key={item.id}
            className={`experience-card experience-card-${item.theme}`}
          >
            {/* Left Media Area: Product preview / Device visual */}
            <div className="exp-card-media-wrap">
              <div className="exp-media-frame">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="exp-card-img"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Content Area: Company Details, Timeline & Learn More Link */}
            <div className="exp-card-content">
              <div className="exp-card-meta-row">
                <span className="exp-company-tag">{item.role}</span>
                <span className="exp-period-pill">{item.period}</span>
              </div>

              <h2 className="exp-company-name">{item.company}</h2>
              <h3 className="exp-headline">{item.headline}</h3>

              <p className="exp-description">{item.description}</p>

              {/* Tag pills */}
              <div className="exp-tags-row">
                {item.tags.map((tag) => (
                  <span key={tag} className="exp-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Apple "Learn more ›" Link */}
              <div className="exp-action-row">
                <a
                  href={item.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="exp-learn-more-link"
                  aria-label={`Learn more about ${item.company} (opens in new tab)`}
                >
                  Learn more <span className="exp-chevron" aria-hidden="true">›</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Footer Callout */}
      <footer className="experience-footer-cta">
        <div className="exp-footer-card">
          <div>
            <h4>Want to learn more about my background?</h4>
            <p>I’m always open to discussing new opportunities, systems design, and creative collaborations.</p>
          </div>
          <div className="exp-footer-actions">
            {onProjects && (
              <button
                type="button"
                className="exp-footer-btn secondary"
                onClick={onProjects}
              >
                Browse Projects
              </button>
            )}
            {onContact && (
              <button
                type="button"
                className="exp-footer-btn primary"
                onClick={onContact}
              >
                Get in Touch
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
