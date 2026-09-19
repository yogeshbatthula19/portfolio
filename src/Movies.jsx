import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDraggable } from './useDraggable.js';
import './AppleTVMovies.css';

export const movies = [
  {
    id: 'premalu',
    name: 'Premalu',
    year: '2024',
    genre: 'Romance · Comedy',
    duration: '2h 36m',
    rating: '8.4',
    quality: '4K HDR',
    audio: 'Dolby Atmos',
    tagline: 'A laugh-out-loud romance in the heart of Hyderabad.',
    x: 30,
    y: 18,
  },
  {
    id: 'salaar',
    name: 'Salaar: Ceasefire',
    year: '2023',
    genre: 'Action · Thriller',
    duration: '2h 55m',
    rating: '8.0',
    quality: '4K HDR',
    audio: 'Dolby 5.1',
    tagline: 'A violent tale of blood, loyalty, and Khansaar brotherhood.',
    x: 429,
    y: 18,
  },
  {
    id: 'baahubali',
    name: 'Baahubali: The Beginning',
    year: '2015',
    genre: 'Epic · Action · Drama',
    duration: '2h 39m',
    rating: '8.1',
    quality: '4K HDR',
    audio: 'Dolby Vision',
    tagline: 'The epic saga of Mahishmati that redefined Indian cinema.',
    x: 828,
    y: 18,
  },
  {
    id: 'black-panther',
    name: 'Black Panther',
    year: '2018',
    genre: 'Action · Sci-Fi',
    duration: '2h 14m',
    rating: '7.3',
    quality: '4K HDR',
    audio: 'IMAX Enhanced',
    tagline: 'Long live the King of Wakanda.',
    x: 1254,
    y: 18,
  },
  {
    id: 'f1',
    name: 'F1: The Movie',
    year: '2025',
    genre: 'Sports · Drama',
    duration: '2h 18m',
    rating: '8.5',
    quality: '4K HDR',
    audio: 'Dolby Atmos',
    tagline: 'Experience pure speed on the pinnacle motorsport grid.',
    x: 1680,
    y: 18,
  },
  {
    id: 'civil-war',
    name: 'Captain America: Civil War',
    year: '2016',
    genre: 'Action · Superhero',
    duration: '2h 27m',
    rating: '7.8',
    quality: '4K HDR',
    audio: 'Dolby Atmos',
    tagline: 'Divided we fall. Team Cap vs. Team Iron Man.',
    x: 30,
    y: 637,
  },
  {
    id: 'rangasthalam',
    name: 'Rangasthalam',
    year: '2018',
    genre: 'Action · Period Drama',
    duration: '2h 59m',
    rating: '8.2',
    quality: '4K HDR',
    audio: 'Dolby 5.1',
    tagline: 'Sound engineer Chitti Babu takes on village oppression.',
    x: 429,
    y: 637,
  },
  {
    id: 'eega',
    name: 'Eega',
    year: '2012',
    genre: 'Fantasy · Revenge Thriller',
    duration: '2h 25m',
    rating: '7.8',
    quality: '4K HDR',
    audio: 'Dolby Digital',
    tagline: 'Reborn as a housefly with an unquenchable vengeance.',
    x: 828,
    y: 637,
  },
  {
    id: 'john-wick',
    name: 'John Wick',
    year: '2014',
    genre: 'Action · Neo-Noir',
    duration: '1h 41m',
    rating: '7.4',
    quality: '4K HDR',
    audio: 'Dolby Atmos',
    tagline: 'They stole his car and killed his puppy. Big mistake.',
    x: 1254,
    y: 637,
  },
  {
    id: 'oohalu',
    name: 'Oohalu Gusagusalade',
    year: '2014',
    genre: 'Romance · Comedy',
    duration: '2h 22m',
    rating: '7.9',
    quality: 'HD',
    audio: 'Stereo',
    tagline: 'A poetic, charming romantic comedy with soulful wit.',
    x: 1680,
    y: 637,
  },
];

export default function Movies() {
  const trigger = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const isMinimized = useRef(false);
  const [selectedMovie, setSelectedMovie] = useState(movies[2]); // Default to Baahubali
  const [activeTab, setActiveTab] = useState('Top 10');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingToast, setPlayingToast] = useState('');
  const { pos, resetPos, dragHandlers } = useDraggable(maximized);

  const openMovies = () => {
    if (!isMinimized.current) { setMaximized(false); resetPos(); }
    isMinimized.current = false;
    setIsOpen(true);
  };

  const closeMovies = () => {
    isMinimized.current = false;
    setIsOpen(false);
    resetPos();
    trigger.current?.focus();
  };

  const handlePlay = (movie) => {
    setPlayingToast(`${movie.name} · ${movie.year} · ${movie.duration}. This is a favorites collection; playback isn't available.`);
    setTimeout(() => setPlayingToast(''), 3500);
  };

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMovies();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const filteredMovies = movies.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Desktop File Icon Trigger */}
      <button
        ref={trigger}
        onClick={openMovies}
        aria-label="Apple TV — My 10 Favorite Movies"
      >
        <div className="desktop-file">
          <img src="/icons/movies.png" alt="" />
        </div>
        <span>Movies</span>
      </button>

      {/* Apple TV Window & Transparent Modal Backdrop */}
      {isOpen && createPortal(
        <div
          className="appletv-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeMovies();
            }
          }}
        >
          <div
            className={'movies-window'+(maximized?' app-fullscreen':'')}
            style={maximized?undefined:{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
            aria-labelledby="appletv-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Apple TV macOS Titlebar */}
            <header className="appletv-navbar" {...dragHandlers}>
              {/* Native macOS Traffic Lights */}
              <div className="appletv-traffic">
                <button
                  type="button"
                  className="red"
                  aria-label="Close Apple TV"
                  title="Close (Esc)"
                  onClick={closeMovies}
                >
                  <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className="yellow"
                  aria-label="Minimize"
                  title="Minimize"
                  onClick={() => { isMinimized.current = true; setIsOpen(false); trigger.current?.focus(); }}
                />
                <button
                  type="button"
                  className="green"
                  aria-label="Toggle maximize Movies"
                  onClick={() => { resetPos(); setMaximized(v => !v); }}
                  title="Zoom"
                />
              </div>

              {/* Cinema Branding & Nav Tabs */}
              <div className="appletv-nav-center">
                <div className="appletv-brand" id="appletv-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                    <line x1="7" y1="2" x2="7" y2="22"/>
                    <line x1="17" y1="2" x2="17" y2="22"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <line x1="2" y1="7" x2="7" y2="7"/>
                    <line x1="2" y1="17" x2="7" y2="17"/>
                    <line x1="17" y1="17" x2="22" y2="17"/>
                    <line x1="17" y1="7" x2="22" y2="7"/>
                  </svg>
                  <span>Cinema</span>
                </div>

                <div className="appletv-tabs">
                  {['Top 10'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`appletv-tab ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Search Filter + Explicit Close Cross */}
              <div className="appletv-header-right">
                <div className="appletv-search-box">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search Movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="appletv-close-btn"
                  aria-label="Close Apple TV window"
                  title="Close (Esc)"
                  onClick={closeMovies}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </header>

        {/* Apple TV Scrollable Body */}
        <div className="appletv-body">
          {/* Top 10 Favorites Shelf */}
          <section className="appletv-shelf">
            <div className="appletv-shelf-header">
              <h2 className="appletv-shelf-title">
                Top 10 Favorites
              </h2>
              <span className="appletv-shelf-count">{filteredMovies.length} Titles</span>
            </div>

            <div className="appletv-grid">
              {filteredMovies.map((movie, index) => {
                const isSelected = selectedMovie?.id === movie.id;
                return (
                  <button
                    key={movie.id}
                    type="button"
                    className={`appletv-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedMovie(movie)}
                    onDoubleClick={() => handlePlay(movie)}
                    title={`${movie.name} · ${movie.year} · ${movie.duration}`}
                  >
                    <div className="appletv-poster-wrap">
                      <div
                        className="appletv-poster-img"
                        role="img"
                        aria-label={movie.name}
                        style={{
                          backgroundPosition: `${movie.x / (2048 - 367) * 100}% ${Math.min(100, movie.y / (1178 - 541) * 100)}%`,
                        }}
                      />
                      <span className="appletv-rank">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="appletv-card-info">
                      <span className="appletv-card-title">{movie.name}</span>
                      <span className="appletv-card-sub">{movie.genre}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Video Player Toast */}
        {playingToast && (
          <div className="appletv-player-toast" role="status">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <span>{playingToast}</span>
          </div>
        )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
