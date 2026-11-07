import React from 'react';
import f_sq1 from './assets/frames/sq1.webp';
import f_sq2 from './assets/frames/sq2.webp';
import f_wide from './assets/frames/wide.webp';
import f_portrait from './assets/frames/portrait.webp';
import f_tall from './assets/frames/tall.webp';
import f_small from './assets/frames/small.webp';
import f_round from './assets/frames/round.webp';
import f_land from './assets/frames/land.webp';
import f_tall2 from './assets/frames/tall2.webp';

// Real ornate gold frames (cut out of a frame sheet). Each frame is drawn as a
// CSS border-image so it fits any card shape: corners keep their detail, only
// the straight edges stretch. Fills its parent (w-full h-full).
const SRC = { sq1: f_sq1, sq2: f_sq2, wide: f_wide, portrait: f_portrait, tall: f_tall, small: f_small, round: f_round, land: f_land, tall2: f_tall2 };
const META = {"sq1": {"w": 281, "h": 269, "l": 51, "t": 52, "r": 49, "b": 52}, "sq2": {"w": 279, "h": 264, "l": 52, "t": 53, "r": 49, "b": 48}, "wide": {"w": 605, "h": 292, "l": 74, "t": 73, "r": 73, "b": 68}, "portrait": {"w": 458, "h": 566, "l": 96, "t": 87, "r": 98, "b": 97}, "tall": {"w": 349, "h": 528, "l": 72, "t": 75, "r": 72, "b": 76}, "small": {"w": 265, "h": 315, "l": 51, "t": 54, "r": 56, "b": 53}, "round": {"w": 323, "h": 341, "l": 46, "t": 59, "r": 53, "b": 53}, "land": {"w": 465, "h": 408, "l": 91, "t": 88, "r": 93, "b": 80}, "tall2": {"w": 363, "h": 422, "l": 78, "t": 74, "r": 84, "b": 64}};
// Older names used around the site map onto the real frames.
const ALIAS = { ornate: 'portrait', carved: 'land', slim: 'sq1', oval: 'round', plaque: 'sq2' };

export default function Frame({ children, className = '', variant = 'portrait', thickness = 0.62 }) {
  const key = SRC[variant] ? variant : (ALIAS[variant] || 'portrait');
  const m = META[key];
  const round = key === 'round';
  if (round) {
    const pct = (v, d) => `${(v / d * 100).toFixed(2)}%`;
    return (
      <div className={`relative w-full h-full select-none transition-transform duration-300 ease-out group-hover:scale-[1.02] ${className}`} style={{ filter: 'drop-shadow(0 14px 14px rgba(0,0,0,0.38))' }}>
        <div className="absolute overflow-hidden rounded-[50%] bg-[#140d05]" style={{ left: pct(m.l, m.w), top: pct(m.t, m.h), right: pct(m.r, m.w), bottom: pct(m.b, m.h) }}>
          <div className="absolute" style={{ inset: '-1.5px' }}>{children}</div>
        </div>
        <img src={SRC.round} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" draggable={false} />
      </div>
    );
  }
  const cq = (v) => `${((v / m.w) * 100 * thickness).toFixed(2)}cqw`;
  return (
    <div
      className={`frame-root relative w-full h-full select-none transition-transform duration-300 ease-out group-hover:scale-[1.02] ${className}`}
      style={{ containerType: 'inline-size', filter: 'drop-shadow(0 14px 14px rgba(0,0,0,0.38))' }}
    >
      <div
        className="absolute inset-0 box-border"
        style={{
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderWidth: `${cq(m.t)} ${cq(m.r)} ${cq(m.b)} ${cq(m.l)}`,
          borderImageSource: `url(${SRC[key]})`,
          borderImageSlice: `${m.t} ${m.r} ${m.b} ${m.l}`,
          borderImageRepeat: 'stretch',
          background: '#140d05',
          backgroundClip: 'content-box',
        }}
      >
        <div className={`relative w-full h-full overflow-hidden ${round ? 'rounded-[50%]' : ''}`} style={{ margin: 0 }}>
          <div className="absolute" style={{ inset: '-1.5px' }}>{children}</div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="frame-shimmer absolute inset-0 box-border pointer-events-none"
        style={{
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderWidth: `${cq(m.t)} ${cq(m.r)} ${cq(m.b)} ${cq(m.l)}`,
          WebkitMaskBoxImageSource: `url(${SRC[key]})`,
          WebkitMaskBoxImageSlice: `${m.t} ${m.r} ${m.b} ${m.l}`,
          WebkitMaskBoxImageWidth: `${cq(m.t)} ${cq(m.r)} ${cq(m.b)} ${cq(m.l)}`,
          WebkitMaskBoxImageRepeat: 'stretch',
        }}
      />
    </div>
  );
}
