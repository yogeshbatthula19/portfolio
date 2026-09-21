import React, { useEffect, useRef, useState } from 'react';
import { Download, ChevronLeft, ChevronRight, Maximize2, ExternalLink } from 'lucide-react';
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

const SLIDES = [
  { id: 1, file: 'slide-01.png', title: 'Cover — Learning, with continuity.' },
  { id: 2, file: 'slide-02.png', title: '01 / Context — Three months to build. A summit stage to show it.' },
  { id: 3, file: 'slide-03.png', title: '02 / Problem — Too much to remember.' },
  { id: 4, file: 'slide-04.png', title: '03 / User Empathy — Understand the pressure behind the click.' },
  { id: 5, file: 'slide-05.png', title: '04 / Working Persona — Ananya. Educator, creator and cohort mentor.' },
  { id: 6, file: 'slide-06.png', title: '05 / Process — Three decisions that shaped the build.' },
  { id: 7, file: 'slide-07.png', title: "06 / Discovery — Discovery plan: what I'd ask next." },
  { id: 8, file: 'slide-08.png', title: '07 / Concept Mapping — Early concept mapping.' },
  { id: 9, file: 'slide-09.png', title: '08 / Screens 01–02 — Progress gives people a place to return.' },
  { id: 10, file: 'slide-10.png', title: '09 / Screens 03–04 — Community is anchored in identity.' },
  { id: 11, file: 'slide-11.png', title: "10 / Screens 05–06 — An AI draft still needs an educator's judgment." },
  { id: 12, file: 'slide-12.png', title: '11 / Screens 07–08 — Every AI step is visible before the next.' },
  { id: 13, file: 'slide-13.png', title: '12 / Screens 09–10 — Create once. Reuse often.' },
  { id: 14, file: 'slide-14.png', title: '13 / Screens 11–12 — People should see what a request will change.' },
  { id: 15, file: 'slide-15.png', title: '14 / Screens 13–14 — Short setup. Teaching context preserved.' },
  { id: 16, file: 'slide-16.png', title: '15 / Screens 15–17 — The learning context travels with the person.' },
  { id: 17, file: 'slide-17.png', title: "16 / Measurement — How I'd measure confidence." },
  { id: 18, file: 'slide-18.png', title: '17 / Roadmap — A roadmap beyond launch.' },
  { id: 19, file: 'slide-19.png', title: '18 / Credits & Sources — Credits and sources.' },
  { id: 20, file: 'slide-20.png', title: 'Appendix A — Authoring Architecture & State Validation.' },
  { id: 21, file: 'slide-21.png', title: 'Appendix B — Design System Specifications & WCAG Matrix.' }
];

export default function AhamXStory({ onClose }) {
  const articleRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const root = articleRef.current;
    if (!root || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = root.querySelectorAll('.trosky-chapter-heading, .trosky-chapter-content>*, .trosky-metric, .ahamx-empathy-card, .ahamx-decision-card, .ahamx-roadmap-card');
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

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

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
        <h1>Learning, with continuity.</h1>
        <p className="ahamx-hero-subtitle">
          I designed the learner, creator and organization flows across desktop and mobile.
        </p>
        <div className="ahamx-role-line">
          <strong>My role:</strong> Lead Product Designer, working with product and engineering to design end-to-end learner, creator and organization workflows across desktop and mobile.
        </div>
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
          The AhamX connected ecosystem: continuous learner progress, AI-assisted lesson authoring, and organization relationships across desktop and mobile.
        </figcaption>
      </figure>

      {/* Project Meta */}
      <div className="trosky-project-meta">
        <div>
          <small>ROLE</small>
          <p>Lead Product Designer — End-to-end UX/UI, interaction architecture across desktop & mobile</p>
        </div>
        <div>
          <small>DELIVERY TIMELINE</small>
          <p>Shipped in three months — Concept to production build</p>
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
          <strong>3 Months</strong>
          <p>Concept to production ship</p>
          <span>Shipped complete learner, educator, and organization workflows within a disciplined three-month build.</span>
        </div>
        <div className="trosky-metric">
          <small>Interface surface</small>
          <strong>17+ Screens</strong>
          <p>Desktop and native mobile</p>
          <span>Unified experience connecting coursework, interactive community feeds, and AI generation pipelines.</span>
        </div>
        <div className="trosky-metric">
          <small>Showcase stage</small>
          <strong>Summit 2026</strong>
          <p>Bharat Mandapam, New Delhi</p>
          <span>Showcased at the Google and ARTPARK booths, India AI Impact Summit 2026.</span>
        </div>
      </div>

      {/* Document Body */}
      <div className="trosky-document-body">

        {/* Chapter 01: Context (Slide 2) */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>01</span>
            <h2>Three months to build. A summit stage to show it.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              AhamX is ZenteiQ's individual digital twin for capability, learning and deployment intelligence. This case study covers its learning experience: learner progress, AI-assisted lesson creation and organization relationships.
            </p>
            <p>
              From a three-month build to a public showcase at the India AI Impact Summit 2026, our team designed a connected AI skilling ecosystem uniting coursework, community discussions, and course authoring under a single shared identity.
            </p>
            <p className="trosky-summary">
              "Showcased at the Google and ARTPARK booths, India AI Impact Summit 2026."
            </p>
            <p>
              Shipped in three months. The design scope spanned 17+ desktop and mobile screens, connecting learners who need to resume interrupted coursework, educators who carry accountability for AI-generated curricula, and organization leads who manage institutional affiliations.
            </p>
          </div>
        </section>

        {/* Chapter 02: The Problem (Slide 3) */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>02</span>
            <h2>Too much to remember.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              People need to pursue their goal while keeping track of their role, progress and unfinished work. The central design risk: people must navigate a broad system while remembering their goal, role and unfinished work across fragmented sessions.
            </p>
            <div className="trosky-details">
              <div>
                <h4>The learner</h4>
                <p>After an interruption, finding the right lesson can cost the small window they had to study.</p>
              </div>
              <div>
                <h4>The educator</h4>
                <p>AI can create a draft quickly, but the educator still carries responsibility for accuracy and teaching quality.</p>
              </div>
              <div>
                <h4>The administrator</h4>
                <p>A connection or profile change can affect an organization. Ambiguous identity makes action feel risky.</p>
              </div>
            </div>
            <p className="trosky-key-line">
              <strong>Core Design Question:</strong> How can every screen help a person understand where they are, what is ready and what to do next?
            </p>
          </div>
        </section>

        {/* Chapter 03: User Empathy & Assumptions (Slide 4) */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>03</span>
            <h2>Understand the pressure behind the click.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              <em>Working assumptions, to validate with users.</em> To design for continuity, I mapped user situations to their hidden concerns and defined explicit experience responses to relieve cognitive pressure:
            </p>

            <div className="ahamx-empathy-grid">
              <div className="ahamx-empathy-card">
                <div className="situation">
                  <span>Learner</span>
                  <b>A learner returns after a busy week.</b>
                </div>
                <div className="concern">"I have forgotten where I stopped."</div>
                <div className="response">Show the current course and completion state.</div>
              </div>

              <div className="ahamx-empathy-card">
                <div className="situation">
                  <span>Educator</span>
                  <b>An educator reviews AI output.</b>
                </div>
                <div className="concern">"My name will be attached to this."</div>
                <div className="response">Keep editing and review stages explicit.</div>
              </div>

              <div className="ahamx-empathy-card">
                <div className="situation">
                  <span>Administrator</span>
                  <b>An administrator changes a relationship.</b>
                </div>
                <div className="concern">"Am I acting for the right organization?"</div>
                <div className="response">Show identity, relationship type and status.</div>
              </div>

              <div className="ahamx-empathy-card">
                <div className="situation">
                  <span>Mobile User</span>
                  <b>A learner studies on a phone between commitments.</b>
                </div>
                <div className="concern">"I only have a few minutes."</div>
                <div className="response">Keep the learning context readable and reachable.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 04: Working Persona (Slide 5) */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>04</span>
            <h2>Ananya. Educator, creator and cohort mentor.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              <em>Working persona, built from the product's role model.</em> Ananya is accountable for the learning experience, even when AI helps produce it:
            </p>

            <div className="ahamx-persona-card">
              <div className="ahamx-persona-header">
                <div className="ahamx-persona-avatar">A</div>
                <div className="ahamx-persona-title">
                  <h4>Ananya Rao</h4>
                  <span>Educator & Cohort Mentor · Department of Data Science · Accountable for learning quality</span>
                </div>
              </div>

              <div className="ahamx-persona-grid">
                <div className="ahamx-persona-pill">
                  <small>What success feels like</small>
                  <p>A course she understands, can improve and feels confident sharing with her students.</p>
                </div>
                <div className="ahamx-persona-pill">
                  <small>What creates hesitation</small>
                  <p>Unclear readiness, repeated setup and uncertainty about which identity is active.</p>
                </div>
                <div className="ahamx-persona-pill">
                  <small>What she needs from the product</small>
                  <p>A visible next step, recoverable work and control over each stage before publishing.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 05: Three Key Decisions (Slide 6) */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>05</span>
            <h2>Three decisions that shaped the build.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              <em>Three interface choices: staged review, short setup and explicit relationship requests.</em> Delivering in three months meant ruthlessly prioritizing core journey continuity:
            </p>

            <div className="ahamx-decisions-grid">
              <div className="ahamx-decision-card">
                <span className="ahamx-decision-num">Decision 01</span>
                <h4>Separate the AI stages</h4>
                <p>
                  Prioritize review of content, script, audio and video. The cost is more steps; the benefit is a clear checkpoint at each transformation.
                </p>
              </div>

              <div className="ahamx-decision-card">
                <span className="ahamx-decision-num">Decision 02</span>
                <h4>Keep initial setup short</h4>
                <p>
                  Ask for essential organization details first and allow later updates. This makes setup lighter while deferring some profile completeness.
                </p>
              </div>

              <div className="ahamx-decision-card">
                <span className="ahamx-decision-num">Decision 03</span>
                <h4>Make relationships explicit</h4>
                <p>
                  Show incoming requests and Approve / Reject actions. This adds a decision step while clarifying what is being requested.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 06: Discovery Plan (Slide 7) */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>06</span>
            <h2>Discovery plan: what I'd ask next.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              <em>Questions to test the working assumptions behind the three design stories.</em> Rather than relying on assumptions, I developed a targeted research discovery guide to validate friction points directly with real users:
            </p>

            <div className="ahamx-discovery-list">
              <div className="ahamx-discovery-item">
                <div className="ahamx-discovery-tag">Learners</div>
                <div className="ahamx-discovery-q">
                  “Tell me about the last time you tried to resume a lesson. What made you stop or search?”
                </div>
              </div>
              <div className="ahamx-discovery-item">
                <div className="ahamx-discovery-tag">Educators</div>
                <div className="ahamx-discovery-q">
                  “Show me the last piece of generated content you changed. What made you doubt it?”
                </div>
              </div>
              <div className="ahamx-discovery-item">
                <div className="ahamx-discovery-tag">Organization leads</div>
                <div className="ahamx-discovery-q">
                  “Walk me through the last request you approved. What did you need to verify?”
                </div>
              </div>
            </div>

            <div className="ahamx-validation-loop">
              <span className="loop-label">Validation Loop</span>
              <p>Live user scenario → Observed friction → Design decision → Screen iteration → Benchmark metric</p>
            </div>
          </div>
        </section>

        {/* Chapter 07: Story 1 — Return to Learning (Slide 8, 9, 10) */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>07</span>
            <h2>Story 1 — Progress gives people a place to return.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              The learner dashboard brings current learning progress and recommendations into one view. Interrupted learners need immediate orientation before choosing what to do next.
            </p>
            <p className="trosky-summary">
              <strong>The trade-off I accepted:</strong> "I kept progress and recommendations together, accepting a denser dashboard so learners could see current work and what to explore next."
            </p>

            <figure>
              <a href="/case-studies/ahamx/screens/dashboard.png" target="_blank" rel="noreferrer" aria-label="Open Learner Dashboard">
                <img
                  src="/case-studies/ahamx/screens/dashboard.png"
                  alt="AhamX Learner Dashboard with progress tracking"
                  loading="lazy"
                />
              </a>
              <figcaption>Learner dashboard: the current course sits first, so a returning learner resumes in one tap, accompanied by profile completion and recent activity.</figcaption>
            </figure>

            <p>
              Beyond coursework, community discussions carry organizational credibility by attributing every post to verified roles. We designed <strong>Sarathi</strong>, a contextual feed pairing authors with their active institution and department.
            </p>

            <div className="ahamx-dual-screens">
              <figure>
                <a href="/case-studies/ahamx/screens/feed.png" target="_blank" rel="noreferrer" aria-label="Open Sarathi Community Feed">
                  <img src="/case-studies/ahamx/screens/feed.png" alt="Sarathi community feed" loading="lazy" />
                </a>
                <figcaption>Sarathi feed: posts pair the author's name, role, and department, giving every update verifiable authority.</figcaption>
              </figure>

              <figure>
                <a href="/case-studies/ahamx/screens/profile.png" target="_blank" rel="noreferrer" aria-label="Open Personal Profile">
                  <img src="/case-studies/ahamx/screens/profile.png" alt="AhamX personal profile" loading="lazy" />
                </a>
                <figcaption>Personal profile: accredited contributions, active cohorts, and peer connections share one unified view.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Chapter 08: Story 2 — Review AI Work (Slide 9, 11, 12, 13) */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>08</span>
            <h2>Story 2 — An AI draft still needs an educator's judgment.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              Every AI step is visible before the next: lesson content, script, audio and video. In educational technology, generative AI cannot be an autonomous black box. The educator remains accountable for pedagogical tone and accuracy.
            </p>
            <p className="trosky-summary">
              <strong>The trade-off I accepted:</strong> "I accepted extra steps in exchange for a checkpoint at each AI stage, keeping educator review between draft generation and publication."
            </p>

            <figure>
              <a href="/case-studies/ahamx/screens/outline.png" target="_blank" rel="noreferrer" aria-label="Open Course Outline">
                <img
                  src="/case-studies/ahamx/screens/outline.png"
                  alt="Course outline showing 0/8 lessons ready beside disabled Publish"
                  loading="lazy"
                />
              </a>
              <figcaption>Course outline detail: readiness is explicitly counted (0 of 8 lessons ready) right beside an inactive Publish control, ensuring incomplete drafts cannot be mistakenly published.</figcaption>
            </figure>

            <div className="ahamx-dual-screens">
              <figure>
                <a href="/case-studies/ahamx/screens/content.png" target="_blank" rel="noreferrer" aria-label="Open Lesson Editor">
                  <img src="/case-studies/ahamx/screens/content.png" alt="In-line lesson editor" loading="lazy" />
                </a>
                <figcaption>Lesson editor: teaching text and learning goals remain visible while the educator edits.</figcaption>
              </figure>

              <figure>
                <a href="/case-studies/ahamx/screens/script.png" target="_blank" rel="noreferrer" aria-label="Open Narration Script Review">
                  <img src="/case-studies/ahamx/screens/script.png" alt="Narration script review stage" loading="lazy" />
                </a>
                <figcaption>Narration script: words can be proofread and adjusted in a dedicated stage before synthetic voice delivery.</figcaption>
              </figure>
            </div>

            <div className="ahamx-dual-screens">
              <figure>
                <a href="/case-studies/ahamx/screens/audio.png" target="_blank" rel="noreferrer" aria-label="Open Audio Review">
                  <img src="/case-studies/ahamx/screens/audio.png" alt="Audio review checkpoint" loading="lazy" />
                </a>
                <figcaption>Audio synthesis: interactive playback controls let educators audition voice, tone, and pacing before video rendering.</figcaption>
              </figure>

              <figure>
                <a href="/case-studies/ahamx/screens/video.png" target="_blank" rel="noreferrer" aria-label="Open Video Lesson Preview">
                  <img src="/case-studies/ahamx/screens/video.png" alt="Video preview and draft save" loading="lazy" />
                </a>
                <figcaption>Video lesson: final preview with timestamps, captions, and explicit Save as Draft and Export options.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Chapter 09: Story 3 — Act for an Organization (Slide 10, 14, 15) */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>09</span>
            <h2>Story 3 — People should know what they're approving.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              Each request brings the person, relationship and decision into the same view. When an administrator manages an institution, ambiguous identity makes action feel risky.
            </p>
            <p className="trosky-summary">
              <strong>The trade-off I accepted:</strong> "I kept requests as compact rows, accepting less detail in exchange for comparing the requester, relationship and available actions together."
            </p>

            <figure>
              <a href="/case-studies/ahamx/screens/hierarchy.png" target="_blank" rel="noreferrer" aria-label="Open Organization Hierarchy">
                <img
                  src="/case-studies/ahamx/screens/hierarchy.png"
                  alt="Spatial graph showing parent, child, and collaborator institutions"
                  loading="lazy"
                />
              </a>
              <figcaption>Hierarchy: a spatial map shows relationships between parent entities, departments, and collaborator institutions, complementing the action list.</figcaption>
            </figure>

            <div className="ahamx-dual-screens">
              <figure>
                <a href="/case-studies/ahamx/screens/network.png" target="_blank" rel="noreferrer" aria-label="Open Network Requests">
                  <img src="/case-studies/ahamx/screens/network.png" alt="Pending network requests" loading="lazy" />
                </a>
                <figcaption>Network requests: each incoming row shows who, what relationship, and when, with paired Approve and Reject actions.</figcaption>
              </figure>

              <figure>
                <a href="/case-studies/ahamx/screens/register.png" target="_blank" rel="noreferrer" aria-label="Open Registration Setup">
                  <img src="/case-studies/ahamx/screens/register.png" alt="Organization registration" loading="lazy" />
                </a>
                <figcaption>Short setup: registration asks for three essential fields first, letting institutions start quickly while allowing profile completion later.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Chapter 10: Mobile Experience (Slide 16) */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>10</span>
            <h2>Mobile learning, profile and cohort discussion.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              <em>The learning context travels with the person.</em> Responsive mobile experiences ensure uninterrupted study and peer communication between daily commitments:
            </p>

            <div className="ahamx-mobile-trio">
              <figure>
                <a href="/case-studies/ahamx/screens/mobile-learning.png" target="_blank" rel="noreferrer" aria-label="Open Mobile Learning">
                  <img src="/case-studies/ahamx/screens/mobile-learning.png" alt="Mobile learning dashboard" loading="lazy" />
                </a>
                <figcaption>Bodhi, the learner home: cohorts and active learning time on one glanceable screen.</figcaption>
              </figure>

              <figure>
                <a href="/case-studies/ahamx/screens/mobile-profile.png" target="_blank" rel="noreferrer" aria-label="Open Mobile Entity Profile">
                  <img src="/case-studies/ahamx/screens/mobile-profile.png" alt="Mobile entity profile" loading="lazy" />
                </a>
                <figcaption>Entity profile: organizational context and verified affiliations formatted for small screens.</figcaption>
              </figure>

              <figure>
                <a href="/case-studies/ahamx/screens/mobile-chat.png" target="_blank" rel="noreferrer" aria-label="Open Mobile Cohort Chat">
                  <img src="/case-studies/ahamx/screens/mobile-chat.png" alt="Mobile cohort chat" loading="lazy" />
                </a>
                <figcaption>Cohort discussion: real-time mentor feedback and peer threads keep channel and conversation together.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Chapter 11: Measurement (Slide 11 / 17) */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>11</span>
            <h2>How I'd measure confidence.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              <em>Measure task success and understanding together, before setting improvement targets.</em> Usability validation requires pairing quantitative task success with emotional role comprehension:
            </p>

            <div className="ahamx-table-wrap">
              <table className="ahamx-measurement-table">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Measure</th>
                    <th>Baseline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Can learners resume without help?</strong></td>
                    <td>Completion rate + time to resume</td>
                    <td><span className="ahamx-badge-neutral">To be established</span></td>
                  </tr>
                  <tr>
                    <td><strong>Do educators understand readiness?</strong></td>
                    <td>Correct next-step identification</td>
                    <td><span className="ahamx-badge-neutral">To be established</span></td>
                  </tr>
                  <tr>
                    <td><strong>Is the active identity clear?</strong></td>
                    <td>Role comprehension + wrong-role actions</td>
                    <td><span className="ahamx-badge-neutral">To be established</span></td>
                  </tr>
                  <tr>
                    <td><strong>Can administrators act confidently?</strong></td>
                    <td>Request success + error rate</td>
                    <td><span className="ahamx-badge-neutral">To be established</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="ahamx-caption-sub">
              Key validation tasks: locate the next lesson; identify what remains before Publish; explain the requested relationship before approving it.
            </p>
          </div>
        </section>

        {/* Chapter 12: Roadmap Beyond Launch (Slide 12 / 18) */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>12</span>
            <h2>A roadmap beyond launch.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              Building beyond launch means translating live user feedback into systematic capability upgrades across three core pillars:
            </p>

            <div className="ahamx-roadmap-grid">
              <div className="ahamx-roadmap-card">
                <span className="pillar-num">Pillar 01</span>
                <h4>Strengthen the core</h4>
                <p>Validate critical tasks, improve accessibility standards, and establish quantitative learning metrics across roles.</p>
              </div>

              <div className="ahamx-roadmap-card">
                <span className="pillar-num">Pillar 02</span>
                <h4>Deepen the guidance</h4>
                <p>Introduce contextual tutoring agents and finer editorial controls for AI-generated curriculum authoring.</p>
              </div>

              <div className="ahamx-roadmap-card">
                <span className="pillar-num">Pillar 03</span>
                <h4>Connect the evidence</h4>
                <p>Link verified learning outcomes and institutional attestations into a durable, portable learner profile.</p>
              </div>
            </div>

            <p className="trosky-summary">
              <strong>What I Learned:</strong> "The outline taught me to pair a disabled Publish action with a visible readiness count, so the blocker has an explanation."
            </p>
          </div>
        </section>

        {/* Chapter 13: Credits & Sources (Slide 13 / 19) */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>13</span>
            <h2>Credits and sources.</h2>
          </div>
          <div className="trosky-chapter-content">
            <div className="ahamx-credits-box">
              <div className="ahamx-credits-row">
                <strong>Product design:</strong>
                <span>17 complete desktop and mobile frames designed across 12 weeks for AhamX / ZenteiQ.</span>
              </div>
              <div className="ahamx-credits-row">
                <strong>Showcase recognition:</strong>
                <span>Showcased at the Google and ARTPARK booths, India AI Impact Summit 2026 at Bharat Mandapam, New Delhi.</span>
              </div>
              <div className="ahamx-credits-row">
                <strong>Public supporting quote:</strong>
                <em>“Individual Digital Twin for capability, learning & deployment intelligence”</em> — ZenteiQ's showcase announcement.
              </div>
              <div className="ahamx-credits-row">
                <strong>Data note:</strong>
                <span>Illustrative prototype data; identities and institution details fictionalized. Screen content is prototype data.</span>
              </div>
            </div>

            <div className="ahamx-sources-links">
              <a
                href="https://www.linkedin.com/posts/zenteiq_aisummit-ai-enterpriseai-activity-7430156021882380288-QWFA"
                target="_blank"
                rel="noreferrer"
                className="ahamx-source-link"
              >
                <span>ZenteiQ showcase announcement ↗</span>
                <ExternalLink size={13} />
              </a>
              <a
                href="https://www.pmindia.gov.in/en/news_updates/pm-inaugurates-india-ai-impact-summit-2026/"
                target="_blank"
                rel="noreferrer"
                className="ahamx-source-link"
              >
                <span>PM India summit coverage ↗</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </section>

        {/* Chapter 14: Complete 21-Slide Presentation Deck */}
        <section className="trosky-chapter ahamx-deck-section">
          <div className="trosky-chapter-heading">
            <span>14</span>
            <h2>Complete 21-Slide Presentation Deck</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              Browse through the complete high-resolution 21-slide deck prepared for product and engineering alignment:
            </p>

            <div className="ahamx-deck-viewer">
              <div className="ahamx-deck-toolbar">
                <div className="ahamx-deck-title">
                  <strong>Slide {currentSlideIndex + 1} of {SLIDES.length}</strong>
                  <span>{SLIDES[currentSlideIndex].title}</span>
                </div>
                <div className="ahamx-deck-nav">
                  <button onClick={prevSlide} aria-label="Previous Slide" className="deck-nav-btn">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={nextSlide} aria-label="Next Slide" className="deck-nav-btn">
                    <ChevronRight size={18} />
                  </button>
                  <a
                    href={`/case-studies/ahamx/${SLIDES[currentSlideIndex].file}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open Fullscreen Slide"
                    className="deck-nav-btn"
                  >
                    <Maximize2 size={16} />
                  </a>
                </div>
              </div>

              <div className="ahamx-deck-frame">
                <a
                  href={`/case-studies/ahamx/${SLIDES[currentSlideIndex].file}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Click to view full-resolution slide"
                >
                  <img
                    src={`/case-studies/ahamx/${SLIDES[currentSlideIndex].file}`}
                    alt={SLIDES[currentSlideIndex].title}
                    className="ahamx-deck-img"
                  />
                </a>
              </div>

              {/* Thumbnails row */}
              <div className="ahamx-deck-thumbs">
                {SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`deck-thumb-btn ${idx === currentSlideIndex ? 'active' : ''}`}
                    title={`Go to Slide ${idx + 1}: ${slide.title}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Case Study PDF Download */}
            <div className="ahamx-download-cta">
              <div>
                <h4>Download Complete Presentation Deck</h4>
                <p>Download the full 21-slide high-resolution PDF document (PDF, 3.2 MB).</p>
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
