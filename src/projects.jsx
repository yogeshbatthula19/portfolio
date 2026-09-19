import React, { useRef, useEffect, useState } from 'react';
import { useDraggable } from './useDraggable.js';
import TroskyStory, { TroskyCover } from './TroskyStory.jsx';
import RyzeupStory, { RyzeupCover } from './RyzeupStory.jsx';
import PickleMatesStory, { PickleMatesCover } from './PickleMatesStory.jsx';

export const projects = [
  {
    id: 'picklemates',
    title: 'Crafting PickleMates — A User-Centric Design Journey',
    folderName: 'PickleMates',
    category: '2025 Case Studies · Mobile & B2C Product Design',
    categoryType: 'case-studies',
    year: '2025',
    badgeTag: '2025 Case Study',
    summary: 'A one-stop platform for scheduling pickleball games, managing teams, and tracking real-time scores.',
    visual: 'picklemates',
    folderColor: '#10b981',
    assets: [
      { type: 'photo', src: '/case-studies/picklemates/hero.jpg', title: 'PickleMates Mobile App', pos: 'asset-left' },
      { type: 'photo', src: '/case-studies/picklemates/prototype-mockup.jpg', title: 'Court Schedules', pos: 'asset-center' },
      { type: 'badge', icon: '/icons/figma.png', title: '2025', pos: 'asset-right' }
    ]
  },
  {
    id: 'trosky',
    title: 'Coach in Your Pocket',
    folderName: 'Trosky 365',
    category: 'Case Studies · AI & UX Design',
    categoryType: 'case-studies',
    year: '2024',
    summary: 'Turning daily baseball assignments into a guided conversation with a coach.',
    visual: 'trosky',
    folderColor: '#4ea5eb',
    assets: [
      { type: 'photo', src: '/case-studies/trosky/ff7736796fd5c04654ecf72fdb3338c8006a1ef6.jpg', title: 'Drill Video', pos: 'asset-left' },
      { type: 'doc', src: '/case-studies/trosky/42e00451045c32de61f9c68b53c46469d07f6129.jpg', title: 'Drill Card', pos: 'asset-center' },
      { type: 'badge', icon: '/icons/figma.png', title: 'UX', pos: 'asset-right' }
    ]
  },
  {
    id: 'ryzeup',
    title: 'A Clearer Workspace for Employees and Managers',
    folderName: 'Ryzeup',
    category: 'Case Studies · Native Mobile UX',
    categoryType: 'case-studies',
    year: '2024',
    summary: 'A unified mobile workspace separating team actions from company feeds to improve focus and response times.',
    visual: 'ryzeup',
    folderColor: '#5843a8',
    assets: [
      { type: 'photo', src: '/case-studies/ryzeup/mockup-hero.jpg', title: 'Ryzeup Mobile Overview', pos: 'asset-left' },
      { type: 'photo', src: '/case-studies/ryzeup/mockup-wall.jpg', title: 'Employee Wall & Q&A', pos: 'asset-center' },
      { type: 'badge', icon: '/icons/figma.png', title: 'UX', pos: 'asset-right' }
    ]
  },
  {
    id: 'himseva',
    title: 'HIMSeva · Government of Himachal Pradesh',
    folderName: 'HIMSeva HP',
    category: 'Websites · Digital Governance',
    categoryType: 'websites',
    year: '2024',
    status: 'NDA signed',
    folderSub: 'NDA signed',
    isLocked: true,
    summary: 'NDA signed.',
    coverImage: '/images/workspace/himseva.jpg',
    folderColor: '#c2843b',
    assets: [
      { type: 'photo', src: '/images/workspace/himseva-card.jpg', title: 'HIMSeva Portal Hero', pos: 'asset-left' },
      { type: 'photo', src: '/images/workspace/himseva.jpg', title: 'Himachal Digital Hub', pos: 'asset-center' },
      { type: 'badge', icon: '/icons/finder.png', title: 'Gov', pos: 'asset-right' }
    ]
  }
];

function FolderWithAssets({ project }) {
  return (
    <div className="folder-container-graphic" aria-hidden="true">
      <div className="folder-back-pocket">
        <div className="folder-back-tab" />
      </div>
      <div className="folder-peeking-assets">
        {project.assets?.map((asset, i) => (
          <div key={i} className={`folder-peeking-asset ${asset.pos}`}>
            {asset.type === 'photo' || asset.type === 'doc' ? (
              <img src={asset.src} alt={asset.title || ''} className="peeking-img" />
            ) : asset.type === 'badge' ? (
              <div className="peeking-badge">
                <img src={asset.icon} alt="" className="peeking-badge-icon" />
                <span>{asset.title}</span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="folder-front-flap">
        <div className="folder-front-sheen" />
        <span className={`folder-asset-count ${project.isLocked ? 'is-locked-flap' : ''}`}>
          {project.isLocked ? (
            <span className="locked-pill-content">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              NDA signed
            </span>
          ) : (
            `${project.assets?.length || 3} files`
          )}
        </span>
      </div>
    </div>
  );
}

export function WebsiteQuickLook({ project }) {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem('himseva_unlocked') === 'true';
    } catch {
      return false;
    }
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passwordInput.trim() === 'yogesh1972') {
      try {
        sessionStorage.setItem('himseva_unlocked', 'true');
      } catch {}
      setUnlocked(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  if (project?.isLocked && !unlocked) {
    return (
      <div className="himseva-password-gate">
        <div className={`himseva-lock-card ${shake ? 'shake-anim' : ''}`}>
          <div className="himseva-lock-icon-wrap" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h3>Protected Project</h3>
          <p className="himseva-lock-meta">
            <strong>{project.folderName || project.title}</strong> is covered under an NDA. Enter password to view the design mockup.
          </p>
          <form onSubmit={handleUnlock} className="himseva-password-form">
            <div className="password-input-wrap">
              <input
                type="password"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (error) setError('');
                }}
                autoFocus
                className={error ? 'input-error' : ''}
              />
              <button type="submit" className="unlock-submit-btn" aria-label="Unlock project">
                →
              </button>
            </div>
            {error && <span className="password-error-text" role="alert">{error}</span>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="quicklook-pure-mockup">
      {/* Sleek Browser Chrome */}
      <div className="pure-mockup-header">
        <div className="pure-mockup-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="pure-mockup-url">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <a
            href="https://himseva.hp.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
            title="Open himseva.hp.gov.in (opens in new tab)"
          >
            himseva.hp.gov.in ↗
          </a>
        </div>
        <div className="pure-mockup-status">
          <span className="unlocked-indicator">● NDA Signed · Verified Access</span>
        </div>
      </div>

      {/* Pure Full Website Mockup with Natural Scroll */}
      <div className="pure-mockup-viewport">
        <img
          src={project.coverImage}
          alt={`${project.title} full website mockup`}
          className="pure-mockup-img"
        />
      </div>
    </div>
  );
}

export function ProjectBrowser({ query, onPreview, viewMode = 'grid' }) {
  const [selected, setSelected] = useState('picklemates');
  const itemsRef = useRef([]);

  const visible = projects.filter(p =>
    (p.title + ' ' + (p.folderName || '') + ' ' + p.category).toLowerCase().includes(query.toLowerCase())
  );

  const years = Array.from(new Set(visible.map(p => p.year || '2024'))).sort((a, b) => b.localeCompare(a));

  const active = projects.find(p => p.id === selected) || visible[0];

  useEffect(() => {
    if (visible.length && !visible.some(p => p.id === selected)) {
      setSelected(visible[0].id);
    }
  }, [query, visible, selected]);

  const handleKeyDown = (e, index, project) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % visible.length;
      setSelected(visible[nextIndex].id);
      itemsRef.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + visible.length) % visible.length;
      setSelected(visible[prevIndex].id);
      itemsRef.current[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSelected(visible[0].id);
      itemsRef.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const lastIndex = visible.length - 1;
      setSelected(visible[lastIndex].id);
      itemsRef.current[lastIndex]?.focus();
    } else if (e.code === 'Space' || e.key === 'Enter') {
      e.preventDefault();
      onPreview(project);
    }
  };

  return (
    <div className={'finder-folder-view ' + (viewMode === 'list' ? 'finder-list-view' : '')} role="region" aria-label="Projects Explorer">
      {/* Down-scrolling macOS Finder view grouped by year */}
      <div className="finder-folder-scroll" role="listbox" aria-label="Project folders. Use arrow keys to navigate.">
        {years.map(year => {
          const yearProjects = visible.filter(p => (p.year || '2024') === year);
          if (!yearProjects.length) return null;
          return (
            <div key={year} className="finder-date-section">
              <div className="finder-date-header" aria-hidden="true">
                <span className="finder-date-title">{year}</span>
                <div className="finder-date-line" />
              </div>
              <div className="finder-folder-grid">
                {yearProjects.map(p => {
                  const overallIdx = visible.findIndex(item => item.id === p.id);
                  const projectType = p.categoryType === 'websites' ? 'Website' : 'Case Study';
                  return (
                    <div
                      key={p.id}
                      ref={el => itemsRef.current[overallIdx] = el}
                      className={'finder-folder-item ' + (selected === p.id ? 'is-selected' : '')}
                      tabIndex={0}
                      role="option"
                      aria-selected={selected === p.id}
                      aria-label={`${p.folderName || p.title}. ${projectType}. Use arrow keys to navigate, Space or Enter to open.`}
                      onClick={() => {
                        setSelected(p.id);
                        onPreview(p);
                      }}
                      onDoubleClick={() => onPreview(p)}
                      onKeyDown={e => handleKeyDown(e, overallIdx, p)}
                    >
                      {viewMode === 'list' ? (
                        <div className="finder-list-item-row">
                          <img
                            className="finder-list-icon"
                            src={p.categoryType === 'websites' ? '/icons/finder.png' : '/icons/folder.png'}
                            alt=""
                          />
                          <div className="finder-list-text">
                            <span className="finder-list-title">{p.folderName || p.title}</span>
                            <span className="finder-list-category">
                              {projectType}
                            </span>
                          </div>
                          <span className={`finder-list-tag ${p.isLocked ? 'is-locked-tag' : ''}`}>
                            {p.isLocked ? 'NDA signed' : projectType}
                          </span>
                        </div>
                      ) : (
                        <>
                          <FolderWithAssets project={p} />
                          <span className="finder-folder-name">{p.folderName || p.title}</span>
                          <span className={`finder-folder-sub ${p.isLocked ? 'is-locked-sub' : ''}`}>
                            {projectType}
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {!visible.length && (
          <p className="finder-empty-msg">No matching projects found.</p>
        )}
      </div>

      {/* Authentic macOS Finder status bar */}
      <div className="finder-status-bar">
        <div className="finder-status-left">
          <span className={`finder-status-badge ${active?.isLocked ? 'locked-badge' : ''}`}>
            {active?.categoryType === 'websites' ? 'Website' : 'Case Study'}
          </span>
          <span>
            <b>{active?.folderName || active?.title}</b> — {active?.isLocked ? 'NDA signed' : active?.summary}
          </span>
        </div>
        <div className="finder-status-right">
          <span>{visible.length} items</span>
          <span className="status-separator">|</span>
          <span>macOS Sonoma</span>
          <button
            type="button"
            className="finder-open-active-btn"
            onClick={() => onPreview(active)}
            aria-label={`Open ${active?.folderName || active?.title}`}
          >
            Open ↗
          </button>
        </div>
      </div>
    </div>
  );
}

export function QuickLook({ project, onClose }) {
  const ref = useRef(null);
  const [maximized, setMaximized] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const { pos, resetPos, dragHandlers } = useDraggable(maximized);

  useEffect(() => {
    const previous = document.activeElement;
    ref.current?.showModal();
    return () => previous?.focus();
  }, []);

  const handleClose = () => {
    resetPos();
    onClose();
  };

  return (
    <>
      {minimized && (
        <button
          className="restore-preview"
          onClick={() => {
            setMinimized(false);
            ref.current?.showModal();
          }}
        >
          Restore {project.folderName || project.title}
        </button>
      )}
      <dialog
        className={
          'quicklook ' +
          (project.categoryType === 'websites' ? 'website-dialog ' : '') +
          (project.id !== 'workspace' ? 'recovery-dialog ' : '') +
          (maximized ? 'app-fullscreen' : '')
        }
        ref={ref}
        style={maximized ? undefined : { transform: `translate(${pos.x}px, ${pos.y}px)` }}
        onCancel={handleClose}
        onClick={e => {
          if (e.target === ref.current) handleClose();
        }}
        onKeyDown={e => {
          if ((e.code === 'Space' || e.key === 'Escape') && e.target === ref.current) {
            e.preventDefault();
            handleClose();
          }
        }}
      >
        <div className="quicklook-bar" {...dragHandlers}>
          <div className="mac-window-controls">
            <button className="red" onClick={handleClose} aria-label="Close Quick Look" />
            <button
              className="yellow"
              onClick={() => {
                ref.current?.close();
                setMinimized(true);
              }}
              aria-label="Minimize Quick Look"
            />
            <button
              className="green"
              onClick={() => {
                resetPos();
                setMaximized(v => !v);
              }}
              aria-label="Toggle maximize Quick Look"
            />
          </div>
          <span>Quick Look — {project.folderName || project.title}</span>
          <button onClick={handleClose} aria-label="Close Quick Look" className="quicklook-close-btn">
            <svg style={{ pointerEvents: 'none' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="quicklook-scroll">
          {project.categoryType === 'websites' ? (
            <WebsiteQuickLook project={project} />
          ) : project.id === 'trosky' ? (
            <TroskyStory onClose={handleClose} />
          ) : project.id === 'ryzeup' ? (
            <RyzeupStory onClose={handleClose} />
          ) : project.id === 'picklemates' ? (
            <PickleMatesStory onClose={handleClose} />
          ) : (
            <div className="quicklook-copy">
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
