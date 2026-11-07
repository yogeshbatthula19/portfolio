import React from 'react';
import foodie01 from './assets/foodiee/08D11BD2-E811-496F-87D0-F920267BBD6F.jpg';
import foodie03 from './assets/foodiee/2B9F4E39-0418-4D21-9453-83EE4C46C4B8.jpg';
import foodie05 from './assets/foodiee/5311E363-6852-4A52-A100-BBD7AAB01A02.jpg';
import foodie06 from './assets/foodiee/675A14DB-4D2D-4A6E-A4E7-A15571EB4BD4.jpg';
import foodie10 from './assets/foodiee/F45DA272-9457-419D-94BB-7A652019D1C0.jpg';

// Each frame hangs at its own size and height, like a gallery wall.
const photos = [
  { src: foodie01, alt: 'Mango dessert toast', ratio: '3/4', w: 'sm:w-[16%]', drop: 'sm:mt-0' },
  { src: foodie03, alt: 'Specialty café dish', ratio: '4/5', w: 'sm:w-[21%]', drop: 'sm:mt-14' },
  { src: foodie05, alt: 'Crisp café breakfast', ratio: '1/1', w: 'sm:w-[17%]', drop: 'sm:mt-2' },
  { src: foodie06, alt: 'Handcrafted pasta dish', ratio: '3/4', w: 'sm:w-[19%]', drop: 'sm:mt-20' },
  { src: foodie10, alt: 'Café dessert', ratio: '4/5', w: 'sm:w-[14%]', drop: 'sm:mt-6' },
];

const GOLD = 'linear-gradient(135deg,#f6e7ab 0%,#c99a45 22%,#f3dfa0 45%,#a97a2c 68%,#efd78f 88%,#9a6c22 100%)';


// Off the clock: café frames hung like a gallery wall.
export default function ConceptToCraft() {
  return (
    <section
      className="relative overflow-hidden px-4 sm:px-8 py-20 sm:py-28 text-white"
      style={{ background: 'radial-gradient(ellipse at 50% 20%, #1c4784 0%, #12315a 55%, #0d2444 100%)' }}
      aria-labelledby="craft-title"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="text-center">
          <p className="text-caption uppercase tracking-[0.22em] text-[#d9b35c] font-basier">Off the clock</p>
          <h2 id="craft-title" className="mt-3 text-h1 sm:text-display text-[#dbe7ff]" style={{ fontFamily: "'The Seasons', Georgia, serif" }}>
            I film cafés
          </h2>
          <p className="mt-4 mx-auto max-w-[46ch] text-body text-[#b9c9e6]">
            Weekends, an Osmo Pocket and a lot of coffee. A few frames from the ones I liked.
          </p>
        </div>

        <div className="mt-14 sm:mt-20 grid grid-cols-2 gap-x-5 gap-y-8 sm:flex sm:justify-between sm:items-start sm:gap-0">
          {photos.map((p, i) => (
            <figure
              key={p.src}
              className={`group ${p.w} ${p.drop} ${i % 2 ? 'mt-8 sm:mt-0' : ''} ${i === 4 ? 'col-span-2 w-1/2 mx-auto sm:col-span-1 sm:mx-0' : ''}`}
              style={{ filter: 'drop-shadow(0 18px 18px rgba(0,0,0,0.35))' }}
            >
              <div
                className="p-[7px] sm:p-[9px] rounded-[3px] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[-0.6deg]"
                style={{ backgroundImage: GOLD, boxShadow: 'inset 0 0 0 1px rgba(255,244,196,0.6), inset 0 0 0 3px rgba(120,80,20,0.55)' }}
              >
                <div className="p-[3px] bg-[#1a1308]">
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    style={{ aspectRatio: p.ratio }}
                    className="w-full object-cover block"
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-center text-caption text-[#d9b35c] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {p.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
