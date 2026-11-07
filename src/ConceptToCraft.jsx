import React from 'react';
import foodie01 from './assets/foodiee/08D11BD2-E811-496F-87D0-F920267BBD6F.jpg';
import foodie03 from './assets/foodiee/2B9F4E39-0418-4D21-9453-83EE4C46C4B8.jpg';
import foodie05 from './assets/foodiee/5311E363-6852-4A52-A100-BBD7AAB01A02.jpg';
import foodie06 from './assets/foodiee/675A14DB-4D2D-4A6E-A4E7-A15571EB4BD4.jpg';
import foodie10 from './assets/foodiee/F45DA272-9457-419D-94BB-7A652019D1C0.jpg';

const photos = [
  { src: foodie01, alt: 'Mango dessert toast' },
  { src: foodie03, alt: 'Specialty café dish' },
  { src: foodie05, alt: 'Crisp café breakfast' },
  { src: foodie06, alt: 'Handcrafted pasta dish' },
  { src: foodie10, alt: 'Café dessert' },
];

// Off the clock: a short, still row of café frames.
export default function ConceptToCraft() {
  return (
    <section className="bg-white px-4 sm:px-8 py-16 sm:py-24" aria-labelledby="craft-title">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-caption uppercase tracking-[0.12em] text-gray-500 font-basier">Off the clock</p>
        <h2 id="craft-title" className="mt-2 text-h2 sm:text-h1 text-[#08304C]" style={{ fontFamily: "'The Seasons', Georgia, serif" }}>
          I film cafés
        </h2>
        <p className="mt-3 max-w-[52ch] text-body text-gray-600">
          Weekends, an Osmo Pocket and a lot of coffee. A few frames from the ones I liked.
        </p>
        <div className="mt-8 flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-5 sm:overflow-visible">
          {photos.map((p) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              loading="lazy"
              decoding="async"
              className="snap-start shrink-0 w-[62%] sm:w-auto aspect-[3/4] object-cover rounded-md"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
