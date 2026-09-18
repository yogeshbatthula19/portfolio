import React,{useRef,useEffect,useState} from 'react';
import { createPortal } from 'react-dom';
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
 const [maximized,setMaximized]=useState(false);
 const minimized=useRef(false);
 const { pos, resetPos, dragHandlers } = useDraggable(maximized);
 const close=()=>{
   minimized.current=false;
   resetPos();
   dialog.current?.close();
 };
 useEffect(()=>{const el=dialog.current;const restore=()=>trigger.current?.focus();el.addEventListener('close',restore);return()=>el.removeEventListener('close',restore)},[]);
 return <><button ref={trigger} className="dock-item applications" aria-label="Applications — tools I know" onClick={()=>{if(!minimized.current){setMaximized(false);resetPos();}minimized.current=false;dialog.current.showModal()}}><img src="/icons/applications.png" alt=""/><span className="tooltip">Applications</span></button>{createPortal(<dialog ref={dialog} className={'applications-panel'+(maximized?' app-fullscreen':'')} style={maximized?undefined:{transform:`translate(${pos.x}px, ${pos.y}px)`}} onClick={e=>{if(e.target===dialog.current)close()}}><header className="applications-heading" {...dragHandlers}><div><img src="/icons/applications.png" alt=""/><h2>Applications</h2></div><div className="mac-window-controls"><button className="red" aria-label="Close applications" onClick={close}/><button className="yellow" aria-label="Minimize applications" onClick={()=>{minimized.current=true;dialog.current.close();}}/><button className="green" aria-label="Toggle maximize applications" onClick={()=>{resetPos();setMaximized(v=>!v)}}/></div></header><div className="applications-filters" aria-label="Filter tools">{['All','Design','Planning','Development','AI tools'].map(c=><button key={c} aria-pressed={category===c} onClick={()=>{setCategory(c);setSelected(null)}}>{c}</button>)}</div><div className="applications-grid">{apps.filter(a=>category==='All'||a[2]===category).map(a=><button className={selected===a[0]?'chosen':''} key={a[0]} onClick={()=>setSelected(a[0])}><img src={'/icons/'+a[1]} alt=""/><span>{a[0]}</span></button>)}</div><footer className="applications-description" aria-live="polite">{selected?apps.find(a=>a[0]===selected)[3]:'Tools I know and use'}</footer></dialog>,document.body)}</>
}
