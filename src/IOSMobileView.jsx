import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  Search,
  Wifi,
  BatteryCharging,
  Sun,
  Moon,
  ExternalLink,
  Download,
  ArrowUp,
  Mail,
  Phone,
  MessageCircle,
  Sparkles,
  Play
} from 'lucide-react';
import { ProjectBrowser } from './projects.jsx';
import AboutMe from './AboutMe.jsx';
import Experience from './Experience.jsx';
import { movies } from './Movies.jsx';
import { FlippyBird, TicTacToi } from './Arcade.jsx';
import { answerProfile } from './profileAnswers.js';
import './IOSMobileView.css';

const welcomeMsg = {
  role: 'assistant',
  text: 'Hey! I’m Yogesh. Welcome to my portfolio on iPhone. Feel free to ask me anything about my work, design process, or projects!',
};

const suggestions = [
  'Tell me about yourself',
  'What have you worked on?',
  'What tools do you use?',
  'Outside of design?'
];

export default function IOSMobileView({ dark, setDark, time, onPreview }) {
  const [activeApp, setActiveApp] = useState(null);
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [arcadeGame, setArcadeGame] = useState(null); // 'flippy' | 'tictactoe' | null
  const [selectedMovie, setSelectedMovie] = useState(movies[2]);
  const [movieToast, setMovieToast] = useState('');

  // Messages state
  const [messages, setMessages] = useState([welcomeMsg]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);
  const chatTopic = useRef(null);

  useEffect(() => {
    if (activeApp === 'messages') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing, activeApp]);

  const sendChatMessage = (textToSend) => {
    const text = (textToSend || draft).trim();
    if (!text || typing) return;
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setDraft('');
    setTyping(true);

    const answer = answerProfile(text, chatTopic.current);
    chatTopic.current = answer.id;

    setTimeout(() => {
      setMessages((prev) => [...prev, { ...answer, role: 'assistant' }]);
      setTyping(false);
    }, 450);
  };

  const handlePlayMovie = (movie) => {
    setMovieToast(`Now Playing: ${movie.name} on Apple TV`);
    setTimeout(() => setMovieToast(''), 3500);
  };

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).replace(/\s?[AP]M/, '');

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`ios-mobile-screen ${dark ? 'ios-dark' : 'ios-light'}`}>
      {/* Background Live Wallpaper */}
      <div className="ios-wallpaper-wrap" aria-hidden="true">
        <video
          className="ios-live-wallpaper"
          src="/videos/evening-drive-and-windmills.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="ios-wallpaper-overlay" />
      </div>

      {/* iOS Status Bar */}
      <header className="ios-status-bar">
        <div className="ios-status-left">
          <span className="ios-clock-time">{formattedTime}</span>
        </div>

        {/* Dynamic Island */}
        <div
          className={`ios-dynamic-island ${islandExpanded ? 'expanded' : ''}`}
          onClick={() => setIslandExpanded(!islandExpanded)}
          role="button"
          tabIndex={0}
          aria-label="Dynamic Island"
        >
          <div className="island-dot" />
          <div className="island-content">
            {islandExpanded ? (
              <div className="island-expanded-info">
                <span className="island-title">Yogesh Battula</span>
                <span className="island-sub">Product Designer & Developer</span>
              </div>
            ) : (
              <div className="island-compact-indicator">
                <span className="island-wave-bar bar-1" />
                <span className="island-wave-bar bar-2" />
                <span className="island-wave-bar bar-3" />
              </div>
            )}
          </div>
        </div>

        <div className="ios-status-right">
          {/* Cellular 4-bars */}
          <div className="ios-cellular-bars" aria-label="Full signal">
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
            <span className="bar bar-4" />
          </div>
          <Wifi size={14} className="ios-wifi-icon" />
          {/* Battery Pill */}
          <div className="ios-battery-pill" aria-label="Battery 98%">
            <div className="ios-battery-level" style={{ width: '92%' }} />
          </div>
        </div>
      </header>

      {/* =======================================================================
          VIEW 1: iOS SPRINGBOARD (HOME SCREEN)
          ======================================================================= */}
      {activeApp === null && (
        <main className="ios-springboard">
          {/* iOS Top Widget */}
          <section className="ios-widget-row">
            <div className="ios-glass-widget" onClick={() => setActiveApp('about')}>
              <div className="widget-header">
                <span className="widget-date">{dateStr.toUpperCase()}</span>
                <span className="widget-badge">● Available</span>
              </div>
              <div className="widget-body">
                <h1 className="widget-title">Yogesh Battula</h1>
                <p className="widget-desc">Crafting thoughtful digital interfaces & systems.</p>
              </div>
              <div className="widget-chips">
                <span>📍 Hyderabad</span>
                <span>✨ UX / Code</span>
              </div>
            </div>
          </section>

          {/* iOS 4-Column App Grid */}
          <section className="ios-app-grid" aria-label="Applications">
            {/* 1. Projects */}
            <button
              type="button"
              className="ios-app-item"
              onClick={() => setActiveApp('projects')}
            >
              <div className="ios-app-squircle app-folder">
                <img src="/icons/folder.png" alt="" />
              </div>
              <span className="ios-app-label">Projects</span>
            </button>

            {/* 2. About Me */}
            <button
              type="button"
              className="ios-app-item"
              onClick={() => setActiveApp('about')}
            >
              <div className="ios-app-squircle app-contacts">
                <img src="/icons/contacts.png" alt="" />
              </div>
              <span className="ios-app-label">About Me</span>
            </button>

            {/* 3. Experience */}
            <button
              type="button"
              className="ios-app-item"
              onClick={() => setActiveApp('experience')}
            >
              <div className="ios-app-squircle app-notes">
                <img src="/icons/notes.png" alt="" />
              </div>
              <span className="ios-app-label">Experience</span>
            </button>

            {/* 4. Contact */}
            <button
              type="button"
              className="ios-app-item"
              onClick={() => setActiveApp('contact')}
            >
              <div className="ios-app-squircle app-mail">
                <img src="/icons/mail.png" alt="" />
              </div>
              <span className="ios-app-label">Contact</span>
            </button>

            {/* 5. Resume */}
            <button
              type="button"
              className="ios-app-item"
              onClick={() => setActiveApp('resume')}
            >
              <div className="ios-app-squircle app-document">
                <img src="/icons/document.png" alt="" />
              </div>
              <span className="ios-app-label">Resume</span>
            </button>

            {/* 6. Movies */}
            <button
              type="button"
              className="ios-app-item"
              onClick={() => setActiveApp('movies')}
            >
              <div className="ios-app-squircle app-movies">
                <img src="/icons/movies.png" alt="" />
              </div>
              <span className="ios-app-label">Apple TV</span>
            </button>

            {/* 7. Arcade (Games) */}
            <button
              type="button"
              className="ios-app-item"
              onClick={() => {
                setArcadeGame(null);
                setActiveApp('arcade');
              }}
            >
              <div className="ios-app-squircle app-arcade">
                <img src="/icons/arcade.png" alt="" />
              </div>
              <span className="ios-app-label">Arcade</span>
            </button>

            {/* 8. Messages */}
            <button
              type="button"
              className="ios-app-item"
              onClick={() => setActiveApp('messages')}
            >
              <div className="ios-app-squircle app-messages">
                <img src="/icons/messages.png" alt="" />
                <span className="ios-badge-count">1</span>
              </div>
              <span className="ios-app-label">Messages</span>
            </button>
          </section>

          {/* iOS Floating Bottom Dock */}
          <footer className="ios-dock-container">
            <div className="ios-frosted-dock">
              <button
                type="button"
                className="ios-dock-icon"
                aria-label="Call / Contact"
                onClick={() => setActiveApp('contact')}
              >
                <img src="/icons/contacts.png" alt="" />
              </button>
              <button
                type="button"
                className="ios-dock-icon"
                aria-label="Safari Projects"
                onClick={() => setActiveApp('projects')}
              >
                <img src="/icons/folder.png" alt="" />
              </button>
              <button
                type="button"
                className="ios-dock-icon"
                aria-label="Messages"
                onClick={() => setActiveApp('messages')}
              >
                <img src="/icons/messages.png" alt="" />
                <span className="ios-dock-badge">1</span>
              </button>
              <button
                type="button"
                className="ios-dock-icon"
                aria-label="Music"
                onClick={() => {
                  setMovieToast('Apple Music · Lofi Beats for focus');
                  setTimeout(() => setMovieToast(''), 3000);
                }}
              >
                <img src="/icons/music.png" alt="" />
              </button>
            </div>
          </footer>
        </main>
      )}

      {/* =======================================================================
          VIEW 2: FULL-SCREEN iOS APP CONTAINER (WHEN ANY APP IS OPEN)
          ======================================================================= */}
      {activeApp !== null && (
        <div className="ios-app-window">
          {/* iOS Navigation Header */}
          <header className="ios-nav-header">
            <button
              type="button"
              className="ios-nav-back-btn"
              onClick={() => {
                setActiveApp(null);
                setArcadeGame(null);
              }}
            >
              <ChevronLeft size={22} />
              <span>Home</span>
            </button>

            <h2 className="ios-nav-title">
              {activeApp === 'projects'
                ? 'Projects'
                : activeApp === 'about'
                ? 'About Me'
                : activeApp === 'experience'
                ? 'Experience'
                : activeApp === 'contact'
                ? 'Contact'
                : activeApp === 'resume'
                ? 'Resume'
                : activeApp === 'movies'
                ? 'Apple TV'
                : activeApp === 'arcade'
                ? arcadeGame === 'flippy'
                  ? 'Flippy Bird'
                  : arcadeGame === 'tictactoe'
                  ? 'Tic Tac Toi'
                  : 'Arcade'
                : 'Messages'}
            </h2>

            <div className="ios-nav-right-actions">
              <button
                type="button"
                className="ios-theme-toggle"
                aria-label="Toggle Dark Mode"
                onClick={() => setDark(!dark)}
              >
                {dark ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            </div>
          </header>

          {/* iOS App Scrollable Body */}
          <div className="ios-app-body">
            {/* 1. Projects App */}
            {activeApp === 'projects' && (
              <div className="ios-projects-page">
                <div className="ios-search-bar">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <ProjectBrowser
                  query={searchQuery}
                  onPreview={onPreview}
                  viewMode="list"
                />
              </div>
            )}

            {/* 2. About Me App */}
            {activeApp === 'about' && (
              <div className="ios-about-page">
                <AboutMe
                  onContact={() => setActiveApp('contact')}
                  onProjects={() => setActiveApp('projects')}
                  onExperience={() => setActiveApp('experience')}
                />
              </div>
            )}

            {/* 3. Experience App */}
            {activeApp === 'experience' && (
              <div className="ios-experience-page">
                <Experience
                  onContact={() => setActiveApp('contact')}
                  onProjects={() => setActiveApp('projects')}
                />
              </div>
            )}

            {/* 4. Contact App (Native iOS Contact Card) */}
            {activeApp === 'contact' && (
              <div className="ios-contact-page">
                <div className="ios-contact-hero">
                  <div className="contact-avatar-circle">
                    <img src="/images/welcome-memoji.png" alt="Yogesh Battula" />
                  </div>
                  <h1 className="contact-name">Yogesh Battula</h1>
                  <p className="contact-role">Product Designer & Developer</p>
                  <span className="contact-loc">Hyderabad, India</span>

                  <div className="contact-quick-actions">
                    <a
                      href="mailto:yogeshbattula55@gmail.com"
                      className="contact-circle-btn"
                      title="Send Email"
                    >
                      <Mail size={18} />
                      <span>Mail</span>
                    </a>
                    <button
                      type="button"
                      className="contact-circle-btn"
                      onClick={() => setActiveApp('messages')}
                      title="Message AI"
                    >
                      <MessageCircle size={18} />
                      <span>Message</span>
                    </button>
                    <a
                      href="https://linkedin.com/in/yogesh-battula"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-circle-btn"
                      title="LinkedIn Profile"
                    >
                      <ExternalLink size={18} />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>

                <div className="ios-contact-card-list">
                  <div className="contact-group">
                    <div className="contact-field-row">
                      <span className="field-label">email</span>
                      <a href="mailto:yogeshbattula55@gmail.com" className="field-value">
                        yogeshbattula55@gmail.com
                      </a>
                    </div>
                    <div className="contact-field-row">
                      <span className="field-label">location</span>
                      <span className="field-value">Hyderabad, India</span>
                    </div>
                    <div className="contact-field-row">
                      <span className="field-label">portfolio</span>
                      <span className="field-value">yogeshbattula.com</span>
                    </div>
                  </div>

                  <div className="contact-group">
                    <div className="contact-field-row">
                      <span className="field-label">github</span>
                      <a
                        href="https://github.com/yogeshbatthula19"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="field-value"
                      >
                        github.com/yogeshbatthula19 ↗
                      </a>
                    </div>
                    <div className="contact-field-row">
                      <span className="field-label">experience</span>
                      <span className="field-value">3+ Years Building Web & Mobile</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Resume App */}
            {activeApp === 'resume' && (
              <div className="ios-resume-page">
                <div className="ios-resume-actions">
                  <span>Yogesh Battula · Resume</span>
                  <a
                    href="/documents/yogesh-battula-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ios-pill-btn"
                  >
                    <Download size={14} />
                    Download PDF
                  </a>
                </div>
                <iframe
                  title="Yogesh Battula Resume"
                  src="/documents/yogesh-battula-resume.pdf"
                  className="ios-resume-frame"
                />
              </div>
            )}

            {/* 6. Movies (Apple TV) App */}
            {activeApp === 'movies' && (
              <div className="ios-movies-page">
                <div className="ios-movies-hero">
                  <div
                    className="ios-movies-backdrop"
                    style={{
                      backgroundImage: `url('/images/favorite-movies.png')`,
                      backgroundPosition: `${(selectedMovie.x / (2048 - 367)) * 100}% ${Math.min(
                        100,
                        (selectedMovie.y / (1178 - 541)) * 100
                      )}%`,
                    }}
                  />
                  <div className="ios-movies-hero-content">
                    <span className="ios-tv-badge"> tv+</span>
                    <h2>{selectedMovie.name}</h2>
                    <p className="hero-meta">
                      ★ {selectedMovie.rating} · {selectedMovie.genre} · {selectedMovie.year}
                    </p>
                    <p className="hero-tagline">{selectedMovie.tagline}</p>
                    <button
                      type="button"
                      className="ios-play-pill"
                      onClick={() => handlePlayMovie(selectedMovie)}
                    >
                      <Play size={14} fill="currentColor" />
                      Play Movie
                    </button>
                  </div>
                </div>

                <div className="ios-movies-shelf">
                  <h3 className="shelf-title">Top 10 Favorites</h3>
                  <div className="ios-movies-grid">
                    {movies.map((m, idx) => (
                      <button
                        key={m.id}
                        type="button"
                        className={`ios-movie-card ${selectedMovie.id === m.id ? 'active' : ''}`}
                        onClick={() => setSelectedMovie(m)}
                      >
                        <div
                          className="ios-poster-img"
                          style={{
                            backgroundPosition: `${(m.x / (2048 - 367)) * 100}% ${Math.min(
                              100,
                              (m.y / (1178 - 541)) * 100
                            )}%`,
                          }}
                        />
                        <span className="movie-name">{m.name}</span>
                        <span className="movie-genre">{m.genre}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 7. Arcade (Games) App */}
            {activeApp === 'arcade' && (
              <div className="ios-arcade-page">
                {arcadeGame === null ? (
                  <div className="arcade-catalog">
                    <div className="arcade-spotlight-card">
                      <span className="spotlight-tag">ARCADE SPOTLIGHT</span>
                      <h2>Flippy Bird: Flight Edition</h2>
                      <p>Tap to flap and weave through dynamic obstacles.</p>
                      <button
                        type="button"
                        className="arcade-launch-btn"
                        onClick={() => setArcadeGame('flippy')}
                      >
                        Play Now
                      </button>
                    </div>

                    <h3 className="arcade-section-title">Popular Games</h3>
                    <div className="arcade-app-rows">
                      <div className="arcade-row-card" onClick={() => setArcadeGame('flippy')}>
                        <div className="arcade-row-icon flippy-bg">🐥</div>
                        <div className="arcade-row-info">
                          <h4>Flippy Bird</h4>
                          <p>Endless Arcade Runner · ★ 4.9</p>
                        </div>
                        <button
                          type="button"
                          className="arcade-get-pill"
                          onClick={(e) => {
                            e.stopPropagation();
                            setArcadeGame('flippy');
                          }}
                        >
                          PLAY
                        </button>
                      </div>

                      <div className="arcade-row-card" onClick={() => setArcadeGame('tictactoe')}>
                        <div className="arcade-row-icon ttt-bg">✕ ◯</div>
                        <div className="arcade-row-info">
                          <h4>Tic Tac Toi</h4>
                          <p>Smart AI Match · ★ 4.8</p>
                        </div>
                        <button
                          type="button"
                          className="arcade-get-pill"
                          onClick={(e) => {
                            e.stopPropagation();
                            setArcadeGame('tictactoe');
                          }}
                        >
                          PLAY
                        </button>
                      </div>
                    </div>
                  </div>
                ) : arcadeGame === 'flippy' ? (
                  <div className="ios-game-wrapper">
                    <button
                      type="button"
                      className="game-back-pill"
                      onClick={() => setArcadeGame(null)}
                    >
                      ‹ Back to Arcade
                    </button>
                    <FlippyBird onBack={() => setArcadeGame(null)} />
                  </div>
                ) : (
                  <div className="ios-game-wrapper">
                    <button
                      type="button"
                      className="game-back-pill"
                      onClick={() => setArcadeGame(null)}
                    >
                      ‹ Back to Arcade
                    </button>
                    <TicTacToi onBack={() => setArcadeGame(null)} />
                  </div>
                )}
              </div>
            )}

            {/* 8. Messages App (iMessage UI) */}
            {activeApp === 'messages' && (
              <div className="ios-messages-page">
                <div className="ios-imessage-recipient">
                  <div className="recipient-avatar">
                    <img src="/images/yogesh-portrait.jpg" alt="Yogesh" />
                  </div>
                  <strong>Yogesh Battula</strong>
                  <small>iMessage with Portfolio AI</small>
                </div>

                <div className="ios-chat-history">
                  {messages.map((m, idx) => (
                    <div key={idx} className={`ios-bubble-row ${m.role}`}>
                      <div className="ios-bubble">
                        <p>{m.text}</p>
                        {m.section && (
                          <button
                            type="button"
                            className="bubble-action-btn"
                            onClick={() => {
                              if (m.section === 'Projects') setActiveApp('projects');
                              else if (m.section === 'About me') setActiveApp('about');
                              else if (m.section === 'Contact') setActiveApp('contact');
                              else if (m.section === 'Experience') setActiveApp('experience');
                            }}
                          >
                            {m.action} ↗
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {typing && (
                    <div className="ios-bubble-row assistant">
                      <div className="ios-typing-bubble">
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Suggestions Pills */}
                {messages.length === 1 && (
                  <div className="ios-chat-suggestions">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="suggestion-chip"
                        onClick={() => sendChatMessage(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* iOS Composer Bar */}
                <form
                  className="ios-imessage-composer"
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendChatMessage();
                  }}
                >
                  <input
                    type="text"
                    placeholder="iMessage"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="send-arrow-btn"
                    disabled={!draft.trim() || typing}
                  >
                    <ArrowUp size={18} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {movieToast && (
        <div className="ios-system-toast" role="status">
          <Sparkles size={16} />
          <span>{movieToast}</span>
        </div>
      )}

      {/* iOS Home Indicator Bar (Tap to return Home) */}
      <div
        className="ios-home-indicator-bar"
        onClick={() => {
          setActiveApp(null);
          setArcadeGame(null);
        }}
        role="button"
        tabIndex={0}
        aria-label="Home Bar: Tap to go Home"
      >
        <span className="home-indicator-pill" />
      </div>
    </div>
  );
}
