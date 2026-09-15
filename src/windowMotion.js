// Animate the real window so text, glass, and scrolled content stay continuous.
export function genie(element,target,reverse=false){
 const rect=element.getBoundingClientRect(),dock=target.getBoundingClientRect();
 const dx=dock.left+dock.width/2-rect.left-rect.width/2;
 const dy=dock.top+dock.height/2-rect.top-rect.height/2;
 const sx=Math.max(.025,dock.width/rect.width),sy=Math.max(.025,dock.height/rect.height);
 const frames=[
  {transform:'translate(0px,0px) scale(1,1)',opacity:1,offset:0},
  {transform:`translate(${dx*.16}px,${dy*.12}px) scale(.94,1.015)`,opacity:1,offset:.22},
  {transform:`translate(${dx*.76}px,${dy*.72}px) scale(${Math.max(sx,.29)},.42)`,opacity:.95,offset:.7},
  {transform:`translate(${dx}px,${dy}px) scale(${sx},${sy})`,opacity:0,offset:1}
 ];
 // Suppress the CSS entrance animation while Web Animations owns the transform.
 element.style.animation='none';
 const animation=element.animate(frames,{duration:460,easing:'cubic-bezier(.4,0,.2,1)',direction:reverse?'reverse':'normal',fill:'both'});
 let cleaned=false;
 const cleanup=()=>{if(cleaned)return;cleaned=true;animation.cancel();element.style.animation='none';};
 return {finished:animation.finished,cleanup,cancel:cleanup};
}
