import React from 'react';
export default function AboutCanvas({covered}){
 return <section className={'about-canvas collage-canvas '+(covered?'canvas-covered':'')} inert={covered?true:undefined} aria-hidden={covered}>
 <div className="canvas-intro"><h1>Hi, I’m <span>Yogesh<svg viewBox="0 0 240 16" aria-hidden="true"><path d="M4 10 Q100 0 235 8 M35 15 Q135 7 218 13"/></svg></span><span className="hello-wave" aria-hidden="true">✳</span></h1><p>I turn complex workflows into clear, thoughtful experiences.<br/>From connected care to the tools we use every day.</p></div>
 <div className="collage-art"><img src="/images/collage-sticker.png" alt="Creative collage sticker with a laptop, guitar, books and a person wearing a hat"/></div>
 </section>
}
