import React from 'react';

// Gallery-wall picture frames in pure CSS. Fills its parent (w-full h-full).
// variants: ornate | carved | slim | oval | plaque
const GOLD = 'linear-gradient(135deg,#f6e7ab 0%,#c99a45 22%,#f3dfa0 45%,#a97a2c 68%,#efd78f 88%,#9a6c22 100%)';
const CARVE = 'repeating-linear-gradient(45deg, rgba(110,72,16,0.38) 0 2px, rgba(0,0,0,0) 2px 7px)';
const boss = (pos) => `radial-gradient(circle at 50% 50%, #fff1b8 0 22%, #c99a45 23% 52%, #7a5316 53% 58%, rgba(0,0,0,0) 60%) ${pos} / 30px 30px no-repeat`;
const bossSm = (pos) => `radial-gradient(circle at 50% 50%, #fff1b8 0 25%, #b98a35 26% 60%, #7a5316 61% 68%, rgba(0,0,0,0) 70%) ${pos} / 18px 18px no-repeat`;

const V = {
  ornate: { ring: 'inset-0 rounded-[6px]', img: 'inset-[11px] sm:inset-[15px] rounded-[2px]', carve: true, bosses: true },
  carved: { ring: 'inset-0 rounded-[8px]', img: 'inset-[10px] sm:inset-[14px] rounded-[2px]', carve: true, bosses: true, inner: true },
  slim: { ring: 'inset-0 rounded-[3px]', img: 'inset-[6px] sm:inset-[8px] rounded-[1px]', carve: false, bosses: false },
  oval: { ring: 'inset-0 rounded-[50%]', img: 'inset-[10px] sm:inset-[14px] rounded-[50%]', carve: true, bosses: false },
  plaque: { ring: 'inset-0 rounded-[4px]', img: 'inset-[7px] sm:inset-[10px] rounded-[1px]', carve: false, bosses: false, inner: true },
};

export default function Frame({ children, className = '', variant = 'ornate' }) {
  const v = V[variant] || V.ornate;
  const corners = v.bosses
    ? [boss('top left'), boss('top right'), boss('bottom left'), boss('bottom right'),
       bossSm('top center'), bossSm('bottom center'), bossSm('center left'), bossSm('center right')].join(',')
    : null;
  return (
    <div
      className={`relative w-full h-full select-none transition-transform duration-300 ease-out group-hover:scale-[1.02] ${className}`}
      style={{ filter: 'drop-shadow(0 14px 14px rgba(0,0,0,0.38))' }}
    >
      <div className={`absolute ${v.ring}`} style={{ backgroundImage: GOLD, boxShadow: 'inset 0 0 0 1px rgba(255,244,196,0.7), inset 0 0 0 3px rgba(120,80,20,0.5)' }} />
      {v.carve && <div className={`absolute ${v.ring} opacity-90`} style={{ backgroundImage: CARVE }} />}
      {corners && <div className={`absolute ${v.ring}`} style={{ background: corners }} />}
      <div className={`absolute ${v.img} overflow-hidden bg-[#140d05] p-[3px]`} style={{ boxShadow: '0 0 0 1px rgba(255,236,170,0.55), 0 0 0 3px rgba(90,58,12,0.6)' }}>
        <div className={`w-full h-full overflow-hidden ${variant === 'oval' ? 'rounded-[50%]' : ''}`}>{children}</div>
      </div>
    </div>
  );
}
