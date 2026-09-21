import React, { useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import './TroskyStory.css';
import './TroskyNewsroom.css';
import './AhamXStory.css';

export function AhamXCover() {
  return (
    <div className="trosky-cover ahamx-cover">
      <small>AhamX · 2026 UX Case Study</small>
      <strong>Learning, with<br />continuity.</strong>
      <span>Desktop, mobile & AI workflows for learners & educators ↗</span>
    </div>
  );
}

export default function AhamXStory({ onClose }) {
  const articleRef = useRef(null);

  useEffect(() => {
    const root = articleRef.current;
    if (!root || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = root.querySelectorAll('.trosky-chapter-heading, .trosky-chapter-content>*, .trosky-metric, .ahamx-empathy-card, .ahamx-decision-card');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('trosky-reveal-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

    targets.forEach(target => {
      target.classList.add('trosky-reveal', 'trosky-reveal-pending');
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
      targets.forEach(target => target.classList.remove('trosky-reveal-pending'));
    };
  }, []);

  return (
    <article ref={articleRef} className="trosky-document">
      {/* Editorial Navigation */}
      <nav className="trosky-news-nav" aria-label="Case study navigation">
        <strong>2026 Case studies</strong>
        <a
          href="/"
          onClick={(e) => {
            if (onClose) {
              e.preventDefault();
              onClose();
            }
          }}
          title="Back to portfolio"
        >
          Yogesh’s portfolio ↗
        </a>
      </nav>

      {/* Hero Header */}
      <header className="trosky-hero">
        <small>2026 CASE STUDY · AI & EDTECH</small>
        <span className="trosky-article-byline">Product Design · Yogesh Battula</span>
        <h1>Learning, with continuity</h1>
        <p>
          I designed the learner, creator, and organization flows across desktop and mobile, shipping 17+ screens in a 12-week build for a national showcase at the India AI Impact Summit 2026.
        </p>
      </header>

      {/* Lead Hero Media */}
      <figure className="trosky-lead-media">
        <div className="ahamx-lead-duo">
          <img
            src="/case-studies/ahamx/screens/learner.png"
            alt="AhamX Desktop Learner Dashboard"
            className="ahamx-lead-desktop"
            loading="eager"
          />
          <img
            src="/case-studies/ahamx/screens/mobile-learning.png"
            alt="AhamX Mobile Learning Experience"
            className="ahamx-lead-mobile"
            loading="eager"
          />
        </div>
        <figcaption>
          The AhamX connected ecosystem: continuous learner progress, AI-assisted lesson authoring, and organization networks across desktop and mobile.
        </figcaption>
      </figure>

      {/* Project Meta */}
      <div className="trosky-project-meta">
        <div>
          <small>ROLE</small>
          <p>Lead Product Designer — End-to-end UX/UI, design systems, workflows across desktop & mobile</p>
        </div>
        <div>
          <small>TIMELINE & DELIVERY</small>
          <p>12 Weeks (3 Months) — Concept to shipped production build</p>
        </div>
        <div>
          <small>CLIENT & PRODUCT</small>
          <p>ZenteiQ / AhamX — Individual digital twin for capability, learning and deployment intelligence</p>
        </div>
        <div>
          <small>PUBLIC SHOWCASE</small>
          <p>Google & ARTPARK Booths, India AI Impact Summit 2026 (Bharat Mandapam, New Delhi)</p>
        </div>
      </div>

      {/* Metrics / Highlights */}
      <div className="trosky-metrics" aria-label="Project metrics">
        <div className="trosky-metric">
          <small>Delivery cycle</small>
          <strong>12 Weeks</strong>
          <p>Rapid concept-to-ship</p>
          <span>Shipped complete learner, educator, and organization workflows within a tight 3-month launch window.</span>
        </div>
        <div className="trosky-metric">
          <small>Interface surface</small>
          <strong>17+ Screens</strong>
          <p>Desktop and native mobile</p>
          <span>Unified experience connecting coursework, interactive community feeds, and AI generation pipelines.</span>
        </div>
        <div className="trosky-metric">
          <small>Showcase stage</small>
          <strong>Bharat Mandapam</strong>
          <p>India AI Impact Summit 2026</p>
          <span>Demonstrated live to national leaders, enterprise partners, and educators at the Google and ARTPARK booths.</span>
        </div>
      </div>

      {/* Document Body */}
      <div className="trosky-document-body">

        {/* Chapter 01: Context */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>01</span>
            <h2>Three months to build. A summit stage to show it.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              AhamX is ZenteiQ’s individual digital twin for capability, learning, and deployment intelligence. In late 2025, our team set out on an ambitious mission: build a unified AI-powered skilling ecosystem that connects learning progress, AI-assisted lesson generation, and multi-tenant organizational oversight from the ground up.
            </p>
            <p>
              The product had to prove itself on a high-stakes national stage—the India AI Impact Summit 2026 at Bharat Mandapam, New Delhi. This required balancing rapid production velocity with deep interaction clarity across three intertwined user workflows: <strong>learning</strong>, <strong>creation</strong>, and <strong>organization management</strong>.
            </p>
            <p className="trosky-summary">
              "We didn't just build screens; we built an architecture of continuity where learners never lose their place, creators retain full ownership over AI outputs, and organizations understand every relationship they approve."
            </p>
          </div>
        </section>

        {/* Chapter 02: The Problem */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>02</span>
            <h2>Too much to remember</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              People need to pursue their goals while keeping track of their role, progress, and unfinished work. When platforms fragment these responsibilities, cognitive friction compounds quickly across every user group:
            </p>
            <div className="trosky-details">
              <div>
                <h4>The Learner</h4>
                <p>After an interruption or a busy week, finding the right lesson can consume the small window they had reserved to study.</p>
              </div>
              <div>
                <h4>The Educator</h4>
                <p>AI can generate drafts quickly, but educators carry the ultimate responsibility for accuracy, pedagogical tone, and teaching quality.</p>
              </div>
              <div>
                <h4>The Administrator</h4>
                <p>A relationship or profile change affects an entire institution. Ambiguous identity and unverified requests make administrative action feel risky.</p>
              </div>
            </div>
            <p className="trosky-key-line">
              <strong>Core Design Question:</strong> How can every screen help a person understand where they are, what is ready, and what to do next?
            </p>
          </div>
        </section>

        {/* Chapter 03: User Empathy */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>03</span>
            <h2>Understand the pressure behind the click</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              To design for continuity, I mapped user situations to their hidden emotional concerns and defined explicit interaction responses to relieve that anxiety:
            </p>

            <div className="ahamx-empathy-grid">
              <div className="ahamx-empathy-card">
                <div className="situation">
                  <span>Learner</span>
                  <b>Returns after a busy week</b>
                </div>
                <div className="concern">"I have forgotten where I stopped."</div>
                <div className="response">Show current course and explicit completion percentage directly on the hero.</div>
              </div>

              <div className="ahamx-empathy-card">
                <div className="situation">
                  <span>Educator</span>
                  <b>Reviews AI-generated output</b>
                </div>
                <div className="concern">"My name will be attached to this."</div>
                <div className="response">Keep editing and review stages distinct before any publishing action.</div>
              </div>

              <div className="ahamx-empathy-card">
                <div className="situation">
                  <span>Administrator</span>
                  <b>Changes an institutional relationship</b>
                </div>
                <div className="concern">"Am I acting for the right organization?"</div>
                <div className="response">Display active organization context, relationship type, and request history.</div>
              </div>

              <div className="ahamx-empathy-card">
                <div className="situation">
                  <span>Mobile User</span>
                  <b>Studies between daily commitments</b>
                </div>
                <div className="concern">"I only have a few minutes."</div>
                <div className="response">Keep the immediate next lesson reachable in one tap without nested browsing.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 04: Working Persona */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>04</span>
            <h2>Ananya — Educator, creator, and cohort mentor</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              To anchor our design decisions, we developed a working persona built around the product's primary role model:
            </p>

            <div className="ahamx-persona-card">
              <div className="ahamx-persona-header">
                <div className="ahamx-persona-avatar">A</div>
                <div className="ahamx-persona-title">
                  <h4>Ananya Rao</h4>
                  <span>Educator & Cohort Mentor · Accountable for learning experiences even when AI assists</span>
                </div>
              </div>

              <div className="ahamx-persona-grid">
                <div className="ahamx-persona-pill">
                  <small>What success feels like</small>
                  <p>A course she fully understands, can polish with precision, and feels completely confident sharing with her cohort.</p>
                </div>
                <div className="ahamx-persona-pill">
                  <small>What creates hesitation</small>
                  <p>Unclear readiness states, repetitive setup, and ambiguity about whether an AI draft was automatically published.</p>
                </div>
                <div className="ahamx-persona-pill">
                  <small>What she needs</small>
                  <p>A visible next step, recoverable draft states, and complete human-in-the-loop control at every production stage.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 05: Three Key Decisions */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>05</span>
            <h2>Three decisions that shaped the build</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              In a fast-moving 12-week build, interface clarity comes from deliberate constraints. Three foundational architectural choices guided our design:
            </p>

            <div className="ahamx-decisions-grid">
              <div className="ahamx-decision-card">
                <span className="ahamx-decision-num">Decision 01</span>
                <h4>Separate the AI stages</h4>
                <p>
                  Prioritized linear review across Content, Script, Audio, and Video. The cost is more steps; the benefit is a clear human checkpoint at each transformation.
                </p>
              </div>

              <div className="ahamx-decision-card">
                <span className="ahamx-decision-num">Decision 02</span>
                <h4>Keep initial setup short</h4>
                <p>
                  Collect only essential organization details during onboarding and allow later updates. This prevents abandonment while deferring profile completeness.
                </p>
              </div>

              <div className="ahamx-decision-card">
                <span className="ahamx-decision-num">Decision 03</span>
                <h4>Make relationships explicit</h4>
                <p>
                  Show incoming network requests with paired Approve and Reject actions. This clarifies entity identity and removes institutional ambiguity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 06: Story 1 — Return to Learning */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>06</span>
            <h2>Story 1 — Progress gives people a place to return</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              The learner dashboard brings active course progress and recommendations into one view. Interrupted learners need immediate orientation before choosing what to do next.
            </p>
            <p>
              <strong>The Trade-off I Accepted:</strong> I kept active progress and curated recommendations together, accepting a denser dashboard layout so learners could immediately see current work alongside relevant paths to explore next.
            </p>

            <figure>
              <a href="/case-studies/ahamx/screens/dashboard.png" target="_blank" rel="noreferrer" aria-label="Open Learner Dashboard">
                <img
                  src="/case-studies/ahamx/screens/dashboard.png"
                  alt="AhamX Learner Dashboard with progress tracking"
                  loading="lazy"
                />
              </a>
              <figcaption>Learner view: current courses sit beside profile completion and activity, giving several reasons to return onto one screen.</figcaption>
            </figure>

            <p>
              Beyond coursework, learning is reinforced by peers. We designed <strong>Sarathi</strong>, a contextual community feed where posts clearly pair the author’s name with their institutional role and department, giving every update verifiable authority.
            </p>

            <div className="ahamx-dual-screens">
              <figure>
                <a href="/case-studies/ahamx/screens/feed.png" target="_blank" rel="noreferrer" aria-label="Open Sarathi Community Feed">
                  <img src="/case-studies/ahamx/screens/feed.png" alt="Sarathi community feed" loading="lazy" />
                </a>
                <figcaption>Sarathi feed: posts pair author name, role, and department.</figcaption>
              </figure>

              <figure>
                <a href="/case-studies/ahamx/screens/profile.png" target="_blank" rel="noreferrer" aria-label="Open Personal Profile">
                  <img src="/case-studies/ahamx/screens/profile.png" alt="AhamX personal profile" loading="lazy" />
                </a>
                <figcaption>Personal profile: background and activity share one unified view.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Chapter 07: Story 2 — Review AI Work */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>07</span>
            <h2>Story 2 — An AI draft still needs an educator's judgment</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              In educational technology, generative AI cannot be an autonomous black box. The educator remains legally and pedagogically accountable for what students learn. We designed a multi-checkpoint authoring studio where each AI step is visible before the next: <strong>Outline → Lesson Content → Narration Script → Audio Generation → Video Render</strong>.
            </p>
            <p className="trosky-summary">
              "I accepted extra steps in exchange for a checkpoint at each AI stage, keeping educator review between draft generation and publication."
            </p>

            <figure>
              <a href="/case-studies/ahamx/screens/outline.png" target="_blank" rel="noreferrer" aria-label="Open Course Outline">
                <img
                  src="/case-studies/ahamx/screens/outline.png"
                  alt="Course outline showing 0/8 lessons ready beside disabled Publish"
                  loading="lazy"
                />
              </a>
              <figcaption>Outline detail: 0/8 lessons ready is shown beside an inactive Publish control, making incomplete readiness immediately visible.</figcaption>
            </figure>

            <div className="ahamx-dual-screens">
              <figure>
                <a href="/case-studies/ahamx/screens/content.png" target="_blank" rel="noreferrer" aria-label="Open Lesson Editor">
                  <img src="/case-studies/ahamx/screens/content.png" alt="In-line lesson editor" loading="lazy" />
                </a>
                <figcaption>Lesson editor: teaching text and learning goals share a clear workspace.</figcaption>
              </figure>

              <figure>
                <a href="/case-studies/ahamx/screens/script.png" target="_blank" rel="noreferrer" aria-label="Open Narration Script Review">
                  <img src="/case-studies/ahamx/screens/script.png" alt="Narration script review stage" loading="lazy" />
                </a>
                <figcaption>Narration script: words can be proofread and adjusted before synthetic voice delivery.</figcaption>
              </figure>
            </div>

            <div className="ahamx-dual-screens">
              <figure>
                <a href="/case-studies/ahamx/screens/audio.png" target="_blank" rel="noreferrer" aria-label="Open Audio Review">
                  <img src="/case-studies/ahamx/screens/audio.png" alt="Audio review checkpoint" loading="lazy" />
                </a>
                <figcaption>Audio stage: interactive playback checkpoint before proceeding to video compilation.</figcaption>
              </figure>

              <figure>
                <a href="/case-studies/ahamx/screens/video.png" target="_blank" rel="noreferrer" aria-label="Open Video Lesson Preview">
                  <img src="/case-studies/ahamx/screens/video.png" alt="Video preview and draft save" loading="lazy" />
                </a>
                <figcaption>Video preview: final render playback with explicit Save as Draft and Save Concept controls.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Chapter 08: Story 3 — Act for an Organization */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>08</span>
            <h2>Story 3 — People should know what they're approving</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              Institutional relationships should never be ambiguous. When an administrator manages an educational network, they must know exactly who is requesting connection, what relationship is being established, and what access is granted.
            </p>
            <p>
              We paired two complementary mental models: a <strong>structural spatial graph</strong> that shows institutional hierarchies, and an <strong>actionable request list</strong> that keeps decisions compact and immediate.
            </p>

            <figure>
              <a href="/case-studies/ahamx/screens/hierarchy.png" target="_blank" rel="noreferrer" aria-label="Open Organization Hierarchy">
                <img
                  src="/case-studies/ahamx/screens/hierarchy.png"
                  alt="Spatial graph showing parent, child, and collaborator institutions"
                  loading="lazy"
                />
              </a>
              <figcaption>Hierarchy detail: a spatial map shows relationships between entities, complementing the action list rather than replacing it.</figcaption>
            </figure>

            <div className="ahamx-dual-screens">
              <figure>
                <a href="/case-studies/ahamx/screens/network.png" target="_blank" rel="noreferrer" aria-label="Open Network Requests">
                  <img src="/case-studies/ahamx/screens/network.png" alt="Pending network requests" loading="lazy" />
                </a>
                <figcaption>Network requests: each row shows who, what relationship, and when, with paired Approve and Reject actions.</figcaption>
              </figure>

              <figure>
                <a href="/case-studies/ahamx/screens/cohorts.png" target="_blank" rel="noreferrer" aria-label="Open Cohort Management">
                  <img src="/case-studies/ahamx/screens/cohorts.png" alt="Student cohort cards" loading="lazy" />
                </a>
                <figcaption>Cohorts: group cards show active learner counts and assigned courses with dedicated management actions.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Chapter 09: Mobile Experience */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>09</span>
            <h2>Mobile learning, profile, and cohort discussion</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              Learning does not stop at the desk. We engineered an adaptive mobile experience where learners can check progress, review organization credentials, and participate in active cohort channels with zero loss of context.
            </p>

            <div className="ahamx-mobile-trio">
              <figure>
                <a href="/case-studies/ahamx/screens/mobile-learning.png" target="_blank" rel="noreferrer" aria-label="Open Mobile Learning">
                  <img src="/case-studies/ahamx/screens/mobile-learning.png" alt="Mobile learning dashboard" loading="lazy" />
                </a>
                <figcaption>Mobile dashboard: cohorts and study time provide a compact glanceable overview.</figcaption>
              </figure>

              <figure>
                <a href="/case-studies/ahamx/screens/mobile-profile.png" target="_blank" rel="noreferrer" aria-label="Open Mobile Entity Profile">
                  <img src="/case-studies/ahamx/screens/mobile-profile.png" alt="Mobile entity profile" loading="lazy" />
                </a>
                <figcaption>Entity profile: organization credentials and tabs preserve structure on a smaller screen.</figcaption>
              </figure>

              <figure>
                <a href="/case-studies/ahamx/screens/mobile-chat.png" target="_blank" rel="noreferrer" aria-label="Open Mobile Cohort Chat">
                  <img src="/case-studies/ahamx/screens/mobile-chat.png" alt="Mobile cohort chat" loading="lazy" />
                </a>
                <figcaption>Cohort discussion: the channel stream and messages stay together, keeping context intact.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Chapter 10: Measurement & Key Lesson */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>10</span>
            <h2>How I measure confidence & what I learned</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              We measure task success and emotional understanding together before setting forward improvement targets:
            </p>

            <div className="trosky-details">
              <div>
                <h4>Resume Without Friction</h4>
                <p>Measured by completion rates and time-to-resume when returning from an interrupted study session.</p>
              </div>
              <div>
                <h4>Educator Readiness Clarity</h4>
                <p>Measured by correct identification of missing steps prior to triggering course publication.</p>
              </div>
              <div>
                <h4>Active Identity Comprehension</h4>
                <p>Measured by zero wrong-role actions when managing multi-tenant organization branches.</p>
              </div>
            </div>

            <p className="trosky-summary">
              <strong>What I Learned:</strong> "The outline taught me to pair a disabled Publish action with a visible readiness count, so the blocker always has an immediate explanation."
            </p>

            {/* Direct Case Study PDF Download */}
            <div className="ahamx-download-cta">
              <div>
                <h4>Read the Full AhamX Case Study</h4>
                <p>Download the complete 21-slide presentation document (PDF, 3.2 MB).</p>
              </div>
              <a
                href="/documents/ahamx-case-study.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ahamx-download-link"
              >
                <Download size={15} />
                <span>Download PDF ↗</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
}
