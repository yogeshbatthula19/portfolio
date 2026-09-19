import React, { useEffect, useRef } from 'react';
import './TroskyStory.css';
import './TroskyNewsroom.css';
import './PickleMatesStory.css';

export function PickleMatesCover() {
  return (
    <div className="trosky-cover picklemates-cover">
      <small>PickleMates · 2025 Case Study</small>
      <strong>Crafting PickleMates —<br />A User-Centric Design Journey.</strong>
      <span>One-stop platform for scheduling games, managing teams, and tracking scores ↗</span>
    </div>
  );
}

export default function PickleMatesStory({ onClose }) {
  const articleRef = useRef(null);

  useEffect(() => {
    const root = articleRef.current;
    if (!root || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = root.querySelectorAll('.trosky-chapter-heading, .trosky-chapter-content>*, .trosky-metric, .picklemates-user-card, .picklemates-role-card');
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
        <strong>2025 Case studies</strong>
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
        <small>2025 CASE STUDY</small>
        <span className="trosky-article-byline">PickleMates · Mobile & B2C Product Design</span>
        <h1>Crafting PickleMates — A User-Centric Design Journey</h1>
        <p>
          Designing a platform for a growing sport like pickleball is as dynamic as the game itself. PickleMates, a one-stop solution for scheduling games, managing teams, and tracking scores, was born out of the need to simplify the chaos players face while organising matches and leagues.
        </p>
      </header>

      {/* Lead Hero Media */}
      <figure className="trosky-lead-media">
        <div>
          <img
            src="/case-studies/picklemates/hero.jpg"
            alt="PickleMates Mobile Application Overview"
            loading="eager"
          />
        </div>
        <figcaption>PickleMates mobile app ecosystem: matchmaking, live court schedules, and league rankings.</figcaption>
      </figure>

      {/* Project Meta */}
      <div className="trosky-project-meta">
        <div>
          <small>Project Category</small>
          <p>B2C Mobile Platform</p>
        </div>
        <div>
          <small>Role</small>
          <p>Product Designer</p>
        </div>
        <div>
          <small>Team</small>
          <p>1 PM, 6 Developers</p>
        </div>
        <div>
          <small>Year</small>
          <p>2025</p>
        </div>
        <div>
          <small>Platform</small>
          <p>iOS & Android</p>
        </div>
      </div>

      {/* Measurable Impact Metrics */}
      <div className="trosky-metrics" aria-label="Project metrics">
        <div className="trosky-metric">
          <small>Scheduling friction</small>
          <strong>80%</strong>
          <p>Reduction in conflicts</p>
          <span>Drop in scheduling disputes and overlapping court bookings across pilot clubs.</span>
        </div>
        <div className="trosky-metric">
          <small>Player satisfaction</small>
          <strong>95%</strong>
          <p>Score-tracking approval</p>
          <span>Players and captains praised the instant dispute-free score confirmation flow.</span>
        </div>
        <div className="trosky-metric">
          <small>Onboarding speed</small>
          <strong>35%</strong>
          <p>Faster game registration</p>
          <span>Measured through usability A/B testing on the streamlined match RSVP sequence.</span>
        </div>
      </div>

      {/* Document Content */}
      <div className="trosky-document-body">
        
        {/* Chapter 01: What is PickleMates */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>01</span>
            <h2>What is PickleMates</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              Pickleball is one of the fastest-growing sports in the world, combining the speed of tennis with the reflexes of table tennis. However, the administrative side of the sport had not kept pace. Players, captains, and club organizers routinely struggled with chaotic coordination.
            </p>
            <p>
              PickleMates was conceived as an all-in-one companion for the court: a clean, responsive mobile platform for discovering matches, confirming RSVPs, managing team rosters, and recording verified scores without relying on disparate chats and spreadsheets.
            </p>
          </div>
        </section>

        {/* Chapter 02: The Problem & Solution */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>02</span>
            <h2>Problem & solution</h2>
          </div>
          <div className="trosky-chapter-content">
            <p className="trosky-key-line">
              Pickleball players, captains, and league organizers struggle with fragmented tools like spreadsheets, group chats, and phone calls, leading to scheduling conflicts, miscommunication, and difficulties in tracking performance.
            </p>
            <p>
              PickleMates provides an all-in-one solution with seamless game scheduling, efficient team management, and real-time score tracking. By integrating these features into a single platform, we enhance player engagement, reduce organizational friction, and create a thriving pickleball community.
            </p>
          </div>
        </section>

        {/* Chapter 03: Core Objectives */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>03</span>
            <h2>Core objectives</h2>
          </div>
          <div className="trosky-chapter-content">
            <div className="picklemates-objectives-grid">
              <div className="picklemates-objective-item">
                <h4>Streamline Match Scheduling</h4>
                <p>Provide a centralized scheduling system allowing players to RSVP quickly, captains to organize matches seamlessly, and teams to coordinate efficiently.</p>
              </div>
              <div className="picklemates-objective-item">
                <h4>Enhance Team & League Management</h4>
                <p>Equip captains and league organizers to manage rosters, record game scores, and update standings effortlessly with automated leaderboards.</p>
              </div>
              <div className="picklemates-objective-item">
                <h4>Improve Community Interaction</h4>
                <p>Foster genuine engagement through in-app match chat, team highlights, and player performance analytics that elevate the sport experience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 04: Targeted Users */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>04</span>
            <h2>Targeted users</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              To design an interface that serves both recreational weekend players and competitive league administrators, we focused on two primary user segments:
            </p>

            <div className="picklemates-users-grid">
              <div className="picklemates-user-card">
                <img
                  src="/case-studies/picklemates/user-captain.png"
                  alt="Players & Captains"
                  className="picklemates-user-avatar"
                  loading="lazy"
                />
                <h3>Players & Captains</h3>
                <span className="picklemates-user-role">On-Court Competitors</span>
                <p>
                  Need quick match discovery, one-tap RSVP confirmations, instant partner pairing, and a quick way to log final match scores right after leaving the court.
                </p>
              </div>

              <div className="picklemates-user-card">
                <img
                  src="/case-studies/picklemates/user-coach.jpg"
                  alt="Coaches & League Organizers"
                  className="picklemates-user-avatar"
                  loading="lazy"
                />
                <h3>Coaches & Organizers</h3>
                <span className="picklemates-user-role">League Administrators</span>
                <p>
                  Need tournament bracket generation, multi-court schedule management, live leaderboard updates, and team performance tracking over seasons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 05: User Research & Competitive Analysis */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>05</span>
            <h2>Research & market landscape</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              To understand user pain points, we conducted in-depth qualitative interviews with casual players, club captains, certified coaches, and regional tournament directors. We uncovered widespread frustration around fragmented communication channels:
            </p>
            <p>
              Users highlighted the critical need for an intuitive interface, real-time push updates for match changes, and effortless role transitions within the app (e.g. playing as a member on Tuesday, captaining a league team on Saturday).
            </p>

            <figure>
              <img
                src="/case-studies/picklemates/competitor-analysis.png"
                alt="Competitive Analysis: PlayTime Scheduler, TeamSnap, WhatsApp & Google Sheets"
                loading="lazy"
              />
              <figcaption>Comparative analysis across PlayTime Scheduler, TeamSnap, and ad-hoc chat tools.</figcaption>
            </figure>

            <p>
              Existing solutions like <strong>PlayTime Scheduler</strong> offer basic public play session coordination but lack advanced team rosters, role-based controls, or verified score recording. On the other end, <strong>TeamSnap</strong> provides robust youth sports administration but is cumbersome, costly, and lacks features tailored to pickleball scoring rules and court rotations. PickleMates directly bridges this gap.
            </p>
          </div>
        </section>

        {/* Chapter 06: Building the User Journeys */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>06</span>
            <h2>Building the user journeys</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              For each user role—player, captain, coach, and league owner—we mapped distinct end-to-end workflows to ensure clear hierarchy and minimize cognitive load:
            </p>

            <div className="picklemates-roles-grid">
              <div className="picklemates-role-card">
                <span className="picklemates-role-tag">Role 01</span>
                <h4>Player</h4>
                <p>RSVP to upcoming games, inspect court location details, check partner assignments, and chat with team members.</p>
              </div>
              <div className="picklemates-role-card">
                <span className="picklemates-role-tag">Role 02</span>
                <h4>Captain</h4>
                <p>Create match events, assign team line-ups, verify scores submitted by opponents, and handle roster subs.</p>
              </div>
              <div className="picklemates-role-card">
                <span className="picklemates-role-tag">Role 03</span>
                <h4>Coach</h4>
                <p>Analyze player performance history, review past game stats, and strategize practice sessions with drills.</p>
              </div>
              <div className="picklemates-role-card">
                <span className="picklemates-role-tag">Role 04</span>
                <h4>League Owner</h4>
                <p>Set up multi-bracket tournaments, approve division standings, broadcast club announcements, and crown winners.</p>
              </div>
            </div>

            <figure>
              <img
                src="/case-studies/picklemates/user-flows.png"
                alt="User Flow Diagrams for PickleMates"
                loading="lazy"
              />
              <figcaption>Role-based navigation mapping and RSVP state machine transitions.</figcaption>
            </figure>
          </div>
        </section>

        {/* Chapter 07: Wireframing the Experience */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>07</span>
            <h2>Wireframing the experience</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              With user journeys defined, I sketched low-fidelity wireframes to iterate rapidly on layout and information hierarchy before committing to visual styling.
            </p>
            <p>
              Our design priorities centered on three pillars:
            </p>
            <ul>
              <li><strong>Ease of navigation:</strong> Essential match actions reachable in one thumb reach.</li>
              <li><strong>Role-based dashboard:</strong> Clear visual delineation when switching between personal player stats and captain management views.</li>
              <li><strong>Frictionless RSVP:</strong> Eliminating multi-step forms so players can secure a court slot in seconds.</li>
            </ul>

            <figure>
              <img
                src="/case-studies/picklemates/wireframes.png"
                alt="Low-fidelity wireframe exploratory sketches"
                loading="lazy"
              />
              <figcaption>Exploratory low-fidelity wireframe iterations focusing on court scheduling and score entry.</figcaption>
            </figure>
          </div>
        </section>

        {/* Chapter 08: Designing for Delight: Visual Identity */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>08</span>
            <h2>Designing for delight</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              Pickleball is vibrant, accessible, and social. The visual identity needed to feel energetic, sporty, and approachable—inviting newcomers while providing the precision competitive athletes demand.
            </p>

            <figure>
              <img
                src="/case-studies/picklemates/visual-design.png"
                alt="Visual Design Language: Typography, Colors, and Components"
                loading="lazy"
              />
              <figcaption>Visual system inspired by court textures, energetic greens, and high-contrast typography.</figcaption>
            </figure>

            <p>
              <strong>Color Palette:</strong> Energizing pickleball court greens, warm energetic yellows, and deep slate navy for contrast.
            </p>
            <p>
              <strong>Typography & Icons:</strong> Modern, athletic sans-serif typography paired with custom iconography for match types, court statuses, and scoring indicators.
            </p>
          </div>
        </section>

        {/* Chapter 09: High-Fidelity Prototypes */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>09</span>
            <h2>High-fidelity prototypes</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              The high-fidelity interactive prototypes translated our research into polished native mobile screens, validating key flows:
            </p>
            <ul>
              <li><strong>Event Creation:</strong> A lightweight three-step wizard to schedule matches, invite teammates, and designate rules.</li>
              <li><strong>Real-Time Match Chat:</strong> Contextual message threads tied directly to individual games to keep coordination in one place.</li>
              <li><strong>Score Submission:</strong> Intuitive numeric stepper dials with opposing captain confirmation to guarantee score integrity.</li>
            </ul>

            <figure>
              <img
                src="/case-studies/picklemates/prototype-mockup.jpg"
                alt="PickleMates High Fidelity Mobile Prototype Mockup"
                loading="lazy"
              />
              <figcaption>High-fidelity mobile interface showcasing scheduled games, court locations, and player roster.</figcaption>
            </figure>
          </div>
        </section>

        {/* Chapter 10: Testing & Real Community Feedback */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>10</span>
            <h2>Testing with the community</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              A design is only as good as its performance in real players’ hands. We conducted hands-on usability testing sessions with 20 active players, captains, and league coordinators across regional clubs.
            </p>
            <p>
              Key validation scenarios included:
            </p>
            <ul>
              <li>Could a player discover an open game and complete their RSVP in under 60 seconds? (Passed: average 38 seconds).</li>
              <li>Could a captain assign court pairings and input set scores without confusion? (Passed: 95% unassisted success).</li>
              <li>Did league administrators have clear visibility into standings, tiebreakers, and rankings? (Passed: 100% clarity).</li>
            </ul>

            <figure>
              <img
                src="/case-studies/picklemates/testing-launch.png"
                alt="Usability Testing Sessions and Community Feedback"
                loading="lazy"
              />
              <figcaption>User testing validation, metrics synthesis, and app store release preparation.</figcaption>
            </figure>
          </div>
        </section>

        {/* Chapter 11: Launch & Results */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>11</span>
            <h2>Launch & impact</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              When PickleMates launched, it received widespread praise across local leagues and community clubs. By eliminating the friction of scattered group chats and paper tally sheets, players spent less time managing and more time playing.
            </p>
            <p className="trosky-key-line">
              PickleMates was more than a design project—it was a journey of connecting people through sport. By putting user needs first and designing with deep empathy, we built a product that solves real logistical headaches while enhancing the joy of pickleball.
            </p>

            <div className="picklemates-store-buttons">
              <span className="picklemates-store-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.02.63-2.67 1.38-.56.65-1.07 1.71-.93 2.74 1.05.08 2.07-.53 2.68-1.25z"/>
                </svg>
                Available on App Store
              </span>
              <span className="picklemates-store-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.6 2.3c-.4.4-.6 1-.6 1.8v15.8c0 .8.2 1.4.6 1.8l.1.1 9-9v-.2l-9.1-9.3zM16.5 15.6l-3.8-3.8 3.8-3.8.1.1 4.5 2.6c1.3.7 1.3 1.9 0 2.6l-4.6 2.3zM12.7 11.8l-8.6 8.6c.4.1.9.1 1.4-.2l9.7-5.5-2.5-2.9zM12.7 12.2l2.5-2.9-9.7-5.6c-.5-.3-1-.2-1.4 0l8.6 8.5z"/>
                </svg>
                Get it on Google Play
              </span>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
}
