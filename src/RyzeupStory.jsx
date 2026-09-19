import React, { useEffect, useRef } from 'react';
import './TroskyStory.css';
import './TroskyNewsroom.css';
import './RyzeupStory.css';

export function RyzeupCover() {
  return (
    <div className="trosky-cover ryzeup-cover">
      <small>Ryzeup · Native Mobile UX</small>
      <strong>A clearer workspace<br />for employees & managers.</strong>
      <span>Separating team actions from company feeds ↗</span>
    </div>
  );
}

export default function RyzeupStory({ onClose }) {
  const articleRef = useRef(null);

  useEffect(() => {
    const root = articleRef.current;
    if (!root || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = root.querySelectorAll('.trosky-chapter-heading, .trosky-chapter-content>*, .trosky-metric, .ryzeup-persona-card, .handoff-pillar-card');
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
      {/* Navigation */}
      <nav className="trosky-news-nav" aria-label="Case study navigation">
        <strong>Case studies</strong>
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

      {/* Hero */}
      <header className="trosky-hero">
        <span className="trosky-article-byline">Product Design · Yogesh Battula</span>
        <h1>Ryzeup</h1>
        <p>A clearer workspace for employees and managers.</p>
      </header>

      {/* Hero Lead Media (Mockups Only) */}
      <figure className="trosky-lead-media">
        <div>
          <img
            src="/case-studies/ryzeup/mockup-hero.jpg"
            alt="Ryzeup mobile workspace mockups"
            style={{ maxHeight: '520px', maxWidth: '92%', width: 'auto', borderRadius: '12px' }}
          />
        </div>
      </figure>

      {/* Project Meta */}
      <div className="trosky-project-meta">
        <div>
          <small>PLATFORMS</small>
          <p>Native Mobile · iOS + Android</p>
        </div>
        <div>
          <small>ROLE</small>
          <p>Product Designer — UX/UI, Interaction design, Wireframing</p>
        </div>
        <div>
          <small>THE PROBLEM</small>
          <p>Field employees and managers face information overload, making it difficult to separate urgent tasks from general workplace updates.</p>
        </div>
        <div>
          <small>THE SOLUTION</small>
          <p>A unified mobile workspace that separates team actions from company feeds, designed to improve focus and response times.</p>
        </div>
      </div>

      {/* Metrics / Highlights */}
      <div className="trosky-metrics" aria-label="Project metrics">
        <div className="trosky-metric">
          <small>Workplace Architecture</small>
          <strong>2 Feeds</strong>
          <p>Wall vs Buzz</p>
          <span>Dedicated destinations separating broadcast announcements from actionable team tasks.</span>
        </div>
        <div className="trosky-metric">
          <small>Role Personas</small>
          <strong>3 Roles</strong>
          <p>Designed around the working day</p>
          <span>Tailored flows for Field Employees (Ananya), People Managers (Rahul), and Internal Communicators (Meera).</span>
        </div>
        <div className="trosky-metric">
          <small>Context Integrity</small>
          <strong>100%</strong>
          <p>Explicit Scope Switching</p>
          <span>Dedicated Self / My Team mode with persistent employee badges to prevent misdirected actions.</span>
        </div>
      </div>

      {/* Document Body */}
      <div className="trosky-document-body">

        {/* Section 01: Personas */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>01</span>
            <h2>Designed around the working day</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              A workplace feed can contain useful information and still feel difficult to use. Policies, peer questions, reminders, and recognition all ask for attention. I frame the problem around relevance: can someone tell what matters to them without opening every item?
            </p>
            <p>
              I also consider the cost of uncertainty. An employee sharing an update needs to understand its audience. A manager reviewing a reminder needs to know whose work is on screen. These concerns connect information hierarchy with trust, rather than treating them as separate design problems.
            </p>

            <div className="ryzeup-personas-grid">
              <div className="ryzeup-persona-card">
                <img
                  src="/case-studies/ryzeup/avatar-ananya.jpg"
                  alt="Ananya"
                  className="persona-avatar-img"
                />
                <div className="persona-header">
                  <h4>Ananya</h4>
                  <span className="persona-role">Field employee</span>
                </div>
                <p className="persona-body">
                  Ananya checks the app between visits. She needs a quick route to relevant updates and a place to ask practical questions. Interrupted attention makes concise previews and recoverable drafts especially important.
                </p>
              </div>

              <div className="ryzeup-persona-card">
                <img
                  src="/case-studies/ryzeup/avatar-rahul.jpg"
                  alt="Rahul"
                  className="persona-avatar-img"
                />
                <div className="persona-header">
                  <h4>Rahul</h4>
                  <span className="persona-role">People manager</span>
                </div>
                <p className="persona-body">
                  Rahul moves between his own work and his team’s updates. Similar names and changing reporting lines can make selection uncertain. He needs persistent employee context, useful timestamps, and an easy way back to Self.
                </p>
              </div>

              <div className="ryzeup-persona-card">
                <img
                  src="/case-studies/ryzeup/avatar-meera.jpg"
                  alt="Meera"
                  className="persona-avatar-img"
                />
                <div className="persona-header">
                  <h4>Meera</h4>
                  <span className="persona-role">Internal communicator</span>
                </div>
                <p className="persona-body">
                  Meera shares policies and announcements. Her task is incomplete until the right audience can find and open the content. She needs a visible destination, attachment feedback, and a clear publication state.
                </p>
              </div>
            </div>

            <p className="ryzeup-footnote">
              Illustrative hypotheses based on the product flows, not profiles of interviewed participants.
            </p>
          </div>
        </section>

        {/* Section 02: Handdrawn Wireframes 1 */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>02</span>
            <h2>From direction to interaction</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              For this case study, I compare three possible starting points. A feed-first experience supports discovery and peer participation, but urgent work can disappear among updates. An action-first home makes priorities clearer, but risks turning the product into another task list. A role-first entry separates employee and manager needs, but adds switching overhead.
            </p>
            <p className="trosky-summary">
              The direction represented in the designs is a feed-led experience with dedicated destinations and a Self / My Team switch. My rationale is to preserve a familiar shared space while making focused actions and viewing context explicit. The tradeoff is that category labels and prioritization must do more work.
            </p>

            <figure>
              <img
                src="/case-studies/ryzeup/wireframes-1.jpg"
                alt="Hand-drawn wireframes: Join workspace, Find updates, Share an update"
                loading="lazy"
              />
              <figcaption>Reconstructed hand-drawn wireframes explaining the design logic.</figcaption>
            </figure>
          </div>
        </section>

        {/* Section 03: Handdrawn Wireframes 2 */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>03</span>
            <h2>The right person. The right context.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              The manager journey introduces another layer of complexity: the same interface can represent different people. I keep the scope switch separate from employee selection so that “which view am I in?” and “whose information is this?” remain distinct questions.
            </p>
            <p>
              These reconstructed wireframes make the intended relationship explicit. The selected identity stays visible; choosing a person is deliberate; and a failed search offers a useful next step. This adds one confirmation action, but helps prevent accidental context changes.
            </p>

            <figure>
              <img
                src="/case-studies/ryzeup/wireframes-2.jpg"
                alt="Hand-drawn wireframes: Context switching, choosing employee, recovery search"
                loading="lazy"
              />
              <figcaption>Reconstructed wireframes detailing scope switching, employee selection hierarchy, and zero-match recovery.</figcaption>
            </figure>
            <p className="ryzeup-footnote">
              I would test whether confirmation prevents mistakes or adds unnecessary friction during frequent switching.
            </p>
          </div>
        </section>

        {/* Section 04: Auth Mockups */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>04</span>
            <h2>Join the right workspace.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              The first decision is about trust before participation. I place organization verification ahead of sign-in so the workspace can be identified before the user enters credentials. The organization name on the next screen helps answer a basic question: am I in the right place?
            </p>
            <p>
              The extra step introduces friction, so recovery matters. Changing the organization code and recovering a password remain available. Invalid-code feedback should preserve what the user entered and explain how to continue.
            </p>

            <figure>
              <img
                src="/case-studies/ryzeup/mockup-auth.jpg"
                alt="Organization verification and sign-in mockups"
                loading="lazy"
              />
              <figcaption>Organization verification and credential entry with clear error recovery.</figcaption>
            </figure>
          </div>
        </section>

        {/* Section 05: Wall & Q&A Mockups */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>05</span>
            <h2>Make every update useful.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              On the wall, I use content categories, authorship, timestamps, and attachment previews to help people scan. A document and a question serve different purposes; showing those differences lets the user judge relevance before opening either one.
            </p>
            <p>
              Field Q&A gives a question its own discussion space. The original question, contributor roles, replies, and response field support a focused exchange. The remaining challenge is navigation language: people need to understand Field Q&A without being taught the label.
            </p>

            <div className="ryzeup-callout-box contrast">
              <div className="callout-header">
                <strong>Contrast check</strong>
              </div>
              <p>
                Verify text pairings against WCAG AA: at least 4.5:1 for normal text and 3:1 for large text. Test readability in outdoor lighting as well.
              </p>
              <span className="callout-link">WCAG contrast guidance ↗</span>
            </div>

            <figure>
              <img
                src="/case-studies/ryzeup/mockup-wall.jpg"
                alt="Employee wall and Field Q&A discussion mockups"
                loading="lazy"
              />
              <figcaption>Employee wall feed with attachment previews and dedicated Field Q&A discussion.</figcaption>
            </figure>
          </div>
        </section>

        {/* Section 06: Composer Mockups */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>06</span>
            <h2>Give every idea the right format.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              Participation needs more than a single text field. A photo update benefits from a preview, while a poll needs explicit choices and a closing period. I treat these as different tasks while keeping the destination and posting action recognizable.
            </p>
            <p>
              The visible screen is only part of that interaction. Upload progress, draft preservation, and duplicate-submission prevention determine whether contributing feels reliable. These are the next states I would specify before implementation, especially for interrupted mobile sessions.
            </p>

            <figure>
              <img
                src="/case-studies/ryzeup/mockup-composer.jpg"
                alt="Photo update and poll composer mockups"
                loading="lazy"
              />
              <figcaption>Tailored composer flows for image previews and time-limited interactive polls.</figcaption>
            </figure>
          </div>
        </section>

        {/* Section 07: Notifications & Buzz Mockups */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>07</span>
            <h2>Know what needs attention.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              Notifications explain what happened through the person, activity, and time. My intended interaction is a direct route back to the relevant conversation, so someone can respond without finding the same content again.
            </p>
            <p>
              Buzz handles a different kind of attention: reminders and work that may need action. Important and New labels, task summaries, and dates help distinguish items. Their meaning needs a consistent rule; if everything looks urgent, the hierarchy stops being useful.
            </p>

            <div className="ryzeup-callout-box">
              <div className="callout-header">
                <strong>Screen reader check</strong>
              </div>
              <p>
                Expose Important and New status text in each card’s native accessibility semantics. Verify VoiceOver and TalkBack reading order without duplicate announcements.
              </p>
              <span className="callout-link">Native accessibility guidance ↗</span>
            </div>

            <figure>
              <img
                src="/case-studies/ryzeup/mockup-buzz.jpg"
                alt="Notifications and personal Buzz view mockups"
                loading="lazy"
              />
              <figcaption>Notifications feed with direct response links alongside the prioritized Buzz task view.</figcaption>
            </figure>
          </div>
        </section>

        {/* Section 08: Team Context Mockups */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>08</span>
            <h2>Keep context in view.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              When the view changes from Self to My Team, the selected person becomes essential context. I keep that identity near the switch because interpreting the same reminder differently can lead to an unnecessary or misdirected follow-up.
            </p>
            <p>
              The selection flow uses an explicit confirmation. Names alone are not enough when colleagues have similar names, so role or department helps disambiguate them. In implementation, the choice must resolve to an employee identifier and respect current access permissions.
            </p>

            <div className="ryzeup-callout-box touch">
              <div className="callout-header">
                <strong>Touch target check</strong>
              </div>
              <p>
                Specify at least 44 × 44 pt targets on iOS and 48 × 48 dp on Android, including each Self / My Team option. Verify hit areas in the native build.
              </p>
              <span className="callout-link">Platform accessibility guidance ↗</span>
            </div>

            <figure>
              <img
                src="/case-studies/ryzeup/mockup-team.jpg"
                alt="Reportee Buzz view and confirmation mockups"
                loading="lazy"
              />
              <figcaption>Reportee Buzz oversight with persistent context badges and explicit selection confirmation.</figcaption>
            </figure>
          </div>
        </section>

        {/* Section 09: Recovery Mockups */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>09</span>
            <h2>Make the next step clear.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              An empty screen can mean several things. A search with no match calls for a different response from a leaderboard that has no data yet. I use specific messages so the user can tell whether they should change an input, return later, or take another action.
            </p>
            <p>
              The reportee search offers Clear Search, a small but useful recovery path. The leaderboard still needs a more precise explanation of why rankings are unavailable. I would separate “no activity yet” from loading, delayed data, and a failed request.
            </p>

            <figure>
              <img
                src="/case-studies/ryzeup/mockup-empty.jpg"
                alt="Empty search and empty leaderboard mockups"
                loading="lazy"
              />
              <figcaption>Actionable empty states guiding users back to recovery rather than dead ends.</figcaption>
            </figure>
          </div>
        </section>

        {/* Section 10: Handoff Pillars */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>10</span>
            <h2>Built to hold together.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              A successful interface must hold up in a native build. My handoff plan connects the visual decisions to platform behavior, release assets, beta evaluation, and recovery states. These requirements guide implementation and launch-readiness checks.
            </p>

            <div className="ryzeup-handoff-grid">
              <div className="handoff-pillar-card">
                <span className="pillar-num">01</span>
                <h4>Platform guidelines</h4>
                <p>
                  Map navigation, back behavior, safe areas, and accessible controls to iOS Human Interface Guidelines and Android Material Design.
                </p>
              </div>

              <div className="handoff-pillar-card">
                <span className="pillar-num">02</span>
                <h4>Deployment assets</h4>
                <p>
                  Organize asset exports, naming, and variants for implementation. Coordinate store screenshots and app metadata for App Store Connect and Google Play Console.
                </p>
              </div>

              <div className="handoff-pillar-card">
                <span className="pillar-num">03</span>
                <h4>Beta distribution</h4>
                <p>
                  Define modular components and document enabled, disabled, and fallback states. Distribute iOS beta builds through TestFlight and Android builds through a Play testing track.
                </p>
              </div>

              <div className="handoff-pillar-card">
                <span className="pillar-num">04</span>
                <h4>Edge cases and errors</h4>
                <p>
                  Map upload failures, lost connections, and permission conflicts when switching between Self and My Team. Preserve drafts and clear stale data appropriately.
                </p>
              </div>
            </div>

            <p className="ryzeup-footnote">
              *Handoff acceptance: verify platform behavior, accessible labels and hit areas, draft recovery, and role-based access in the running build.
            </p>
          </div>
        </section>

        {/* Section 11: Validation */}
        <section className="trosky-chapter">
          <div className="trosky-chapter-heading">
            <span>11</span>
            <h2>Next steps. Real evidence.</h2>
          </div>
          <div className="trosky-chapter-content">
            <p>
              To validate the design against the initial hypotheses, I would run structured usability testing with field employees and managers. The sessions would cover submitting a Field Q&A question, finding a policy, switching viewing context, and recovering from an interrupted session.
            </p>

            <div className="ryzeup-validation-grid">
              <div className="validation-col">
                <h4>Quantitative measures</h4>
                <div className="validation-item">
                  <b>Task success rate</b>
                  <p>Track unassisted completion for submitting Field Q&A questions and switching employee context.</p>
                </div>
                <div className="validation-item">
                  <b>Time on task</b>
                  <p>Compare median time to find specified policy documents with legacy workflows.</p>
                </div>
                <div className="validation-item">
                  <b>Error rate</b>
                  <p>Record wrong-person selections and actions taken in incorrect viewing contexts.</p>
                </div>
              </div>

              <div className="validation-col">
                <h4>Qualitative signals</h4>
                <div className="validation-item">
                  <b>System Usability Scale</b>
                  <p>Standard SUS survey administered after testing to assess perceived usability and complexity.</p>
                </div>
                <div className="validation-item">
                  <b>Contextual inquiry</b>
                  <p>Observe realistic interrupted sessions between field visits, verifying draft recovery and active context recognition.</p>
                </div>
                <div className="validation-item">
                  <b>Decision loop</b>
                  <p>Prioritize context and data-loss errors, revise affected flows, and repeat tasks against baseline.</p>
                </div>
              </div>
            </div>

            <p className="ryzeup-footnote source-note">
              *Source: ryzeup(1).pdf and the author’s supplied role and platform details. Personas and wireframes are reconstructed; accessibility checks, handoff requirements, and validation activities describe the next phase.
            </p>
          </div>
        </section>

      </div>
    </article>
  );
}
