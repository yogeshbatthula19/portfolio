import React,{useEffect,useState} from 'react';
const key='yogesh-desktop-note-v1';
export default function DesktopNotes({covered}){
 const [note,setNote]=useState(()=>{try{return localStorage.getItem(key)||''}catch{return ''}});
 const [status,setStatus]=useState('Saved on this device');
 useEffect(()=>{const timer=setTimeout(()=>{try{localStorage.setItem(key,note);setStatus('Saved on this device')}catch{setStatus('Storage unavailable — copy your note before leaving')}},350);return()=>clearTimeout(timer)},[note]);
 return <section className={'desktop-notes '+(covered?'covered':'')} aria-hidden={covered} inert={covered?true:undefined}><div className="notes-top"><div><img src="/icons/notes.png" alt=""/><span>Notes</span></div><span role="status">{status}</span></div><label htmlFor="desktop-note">A little room to think.</label><textarea id="desktop-note" aria-label="Your personal note" placeholder="Write anything…" value={note} onChange={e=>{setStatus('Saving…');setNote(e.target.value)}} spellCheck/><div className="notes-bottom"><span>{note.trim()?note.trim().split(/\s+/).length:0} words</span><span>Only in this browser · Nothing is sent</span></div></section>
}
