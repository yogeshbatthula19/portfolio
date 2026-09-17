import React,{useRef,useEffect} from 'react';
import { useDraggable } from './useDraggable.js';
const movies=[['Premalu',30,18],['Salaar',429,18],['Baahubali: The Beginning',828,18],['Black Panther',1254,18],['F1',1680,18],['Captain America: Civil War',30,637],['Rangasthalam',429,637],['Eega',828,637],['John Wick',1254,637],['Oohalu Gusagusalade',1680,637]];
export default function Movies(){
 const dialog=useRef(null),trigger=useRef(null);
 const { pos, resetPos, dragHandlers } = useDraggable();
 const close=()=>{
   resetPos();
   dialog.current?.close();
 };
 useEffect(()=>{const el=dialog.current;const restore=()=>trigger.current?.focus();el.addEventListener('close',restore);return()=>el.removeEventListener('close',restore)},[]);
 return <><button ref={trigger} onClick={()=>dialog.current.showModal()} aria-label="Movies — my 10 favorites"><div className="desktop-file"><img src="/icons/movies.png" alt=""/></div><span>Movies</span></button><dialog ref={dialog} className="movies-window" style={{transform:`translate(${pos.x}px, ${pos.y}px)`}} aria-labelledby="movies-title" onClick={e=>{if(e.target===dialog.current)close()}}><header className="movies-header" {...dragHandlers}><button className="movies-close" aria-label="Close movies" onClick={close}><svg style={{pointerEvents:'none'}} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button><img src="/icons/movies.png" alt=""/><div><h2 id="movies-title">Movies</h2><p>My 10 favorites</p></div></header><div className="movies-gallery">{movies.map(([name,x,y],i)=><figure key={name}><div className="movie-poster" role="img" aria-label={name+' poster'} style={{backgroundPosition:`${x/(2048-367)*100}% ${Math.min(100,y/(1178-541)*100)}%`}}/><figcaption><span>{String(i+1).padStart(2,'0')}</span><b>{name}</b></figcaption></figure>)}</div></dialog></>
}
