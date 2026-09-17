import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDraggable } from './useDraggable.js';
import './AppleTVMovies.css';

const movies = [
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
  const [selectedMovie, setSelectedMovie] = useState(movies[2]); // Default to Baahubali
  const [activeTab, setActiveTab] = useState('Watch Now');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingToast, setPlayingToast] = useState('');
  const { pos, resetPos, dragHandlers } = useDraggable();

  const openMovies = () => {
    setIsOpen(true);
  };

  const closeMovies = () => {
    setIsOpen(false);
    resetPos();
    trigger.current?.focus();
  };

  const handlePlay = (movie) => {
    setPlayingToast(`Now Playing: ${movie.name} on Apple TV`);
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
            className="movies-window"
            style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
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
                  onClick={closeMovies}
                />
                <button
                  type="button"
                  className="green"
                  aria-label="Zoom"
                  title="Zoom"
                />
              </div>

              {/* Apple TV Branding & Nav Tabs */}
              <div className="appletv-nav-center">
                <div className="appletv-brand" id="appletv-title">
                  <svg width="15" height="18" viewBox="0 0 170 170" fill="currentColor">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.94-12.04-14.59-6.08-9.33-10.88-20.15-14.4-32.48-3.52-12.33-5.28-24.12-5.28-35.37 0-14.44 3.73-26.6 11.19-36.48 7.46-9.88 16.99-14.93 28.58-15.15 4.8 0 10.3 1.25 16.51 3.74 6.2 2.49 10.29 3.78 12.27 3.86 1.77 0 5.92-1.37 12.44-4.11 6.52-2.74 12.08-3.99 16.68-3.74 12.63.66 22.84 5.37 30.63 14.13-11.04 6.74-16.44 16.03-16.2 27.87.24 9.87 4.09 18.25 11.55 25.13 7.46 6.89 16.32 10.74 26.58 11.56-2.2 6.64-4.8 13.06-7.8 19.26zM119.22 33.64c0-7.3 2.66-14.18 7.99-20.64 5.33-6.46 11.89-10.8 19.68-13 1.09 8.24-.76 15.69-5.55 22.35-4.79 6.66-11.39 10.8-19.8 12.42-.65-.37-1.42-.7-2.32-1.13z"/>
                  </svg>
                  tv <span>app</span>
                </div>

                <div className="appletv-tabs">
                  {['Watch Now', 'Top 10', 'Library'].map((tab) => (
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
          {/* Cinematic Hero Spotlight Banner */}
          {selectedMovie && (
            <div className="appletv-hero">
              <div
                className="appletv-hero-backdrop"
                style={{
                  backgroundImage: `url('/images/favorite-movies.png')`,
                  backgroundPosition: `${selectedMovie.x / (2048 - 367) * 100}% ${Math.min(100, selectedMovie.y / (1178 - 541) * 100)}%`,
                }}
              />

              <div className="appletv-hero-content">
                <div className="appletv-hero-badges">
                  <span className="appletv-badge-tv"> tv+</span>
                  <span className="appletv-badge-format">{selectedMovie.quality}</span>
                  <span className="appletv-badge-format">{selectedMovie.audio}</span>
                </div>

                <h1 className="appletv-hero-title">{selectedMovie.name}</h1>

                <div className="appletv-hero-meta">
                  <span>★ {selectedMovie.rating}</span>
                  <span>{selectedMovie.genre}</span>
                  <span>{selectedMovie.year}</span>
                  <span>{selectedMovie.duration}</span>
                </div>

                <p className="appletv-hero-desc">{selectedMovie.tagline}</p>

                <div className="appletv-hero-actions">
                  <button
                    type="button"
                    className="appletv-btn-play"
                    onClick={() => handlePlay(selectedMovie)}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    Play Movie
                  </button>

                  <button
                    type="button"
                    className="appletv-btn-secondary"
                    onClick={() => setPlayingToast(`Added "${selectedMovie.name}" to Up Next`)}
                  >
                    + Up Next
                  </button>
                </div>
              </div>
            </div>
          )}

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
                    title={`Click to preview, double-click to play ${movie.name}`}
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
