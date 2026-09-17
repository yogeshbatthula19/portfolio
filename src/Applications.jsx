import React,{useRef,useEffect,useState} from 'react';
import { useDraggable } from './useDraggable.js';
const apps=[
 ['Figma','figma.png','Design','Interface design and prototyping'],
 ['Jira','jira.ico','Planning','Issue tracking and team workflows'],
 ['Claude','claude.ico','AI tools','Exploring ideas and working with AI'],
 ['Android Studio','android-studio.png','Development','Android development tools'],
 ['Codex','codex.png','AI tools','Coding with AI assistance'],
 ['Antigravity','antigravity.png','Development','AI-assisted development'],
 ['Photoshop','photoshop.png','Design','Image editing and visual design']
];
export default function Applications(){
 const dialog=useRef(null),trigger=useRef(null);const[category,setCategory]=useState('All'),[selected,setSelected]=useState(null);
 const { pos, resetPos, dragHandlers } = useDraggable();
 const close=()=>{
   resetPos();
   dialog.current?.close();
 };
 useEffect(()=>{const el=dialog.current;const restore=()=>trigger.current?.focus();el.addEventListener('close',restore);return()=>el.removeEventListener('close',restore)},[]);
 return <><button ref={trigger} className="dock-item applications" aria-label="Applications — tools I know" onClick={()=>dialog.current.showModal()}><img src="/icons/applications.png" alt=""/><span className="tooltip">Applications</span></button><dialog ref={dialog} className="applications-panel" style={{transform:`translate(${pos.x}px, ${pos.y}px)`}} onClick={e=>{if(e.target===dialog.current)close()}}><header className="applications-heading" {...dragHandlers}><div><img src="/icons/applications.png" alt=""/><h2>Applications</h2></div><button aria-label="Close applications" className="applications-close-btn" onClick={close}><svg style={{pointerEvents:'none'}} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></header><div className="applications-filters" aria-label="Filter tools">{['All','Design','Planning','Development','AI tools'].map(c=><button key={c} aria-pressed={category===c} onClick={()=>{setCategory(c);setSelected(null)}}>{c}</button>)}</div><div className="applications-grid">{apps.filter(a=>category==='All'||a[2]===category).map(a=><button className={selected===a[0]?'chosen':''} key={a[0]} onClick={()=>setSelected(a[0])}><img src={'/icons/'+a[1]} alt=""/><span>{a[0]}</span></button>)}</div><footer className="applications-description" aria-live="polite">{selected?apps.find(a=>a[0]===selected)[3]:'Tools I know and use'}</footer></dialog></>
}
