import { useState, useRef, useCallback } from 'react';

export function useDraggable(disabled = false) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ pointerX: 0, pointerY: 0, posX: 0, posY: 0 });

  const resetPos = useCallback(() => setPos({ x: 0, y: 0 }), []);

  const onPointerDown = useCallback((e) => {
    if (disabled || e.button !== 0 || window.matchMedia('(max-width: 760px)').matches) return;
    if (e.target.closest('button, a, input, select, textarea, [role="button"]')) return;

    isDraggingRef.current = true;
    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      posX: pos.x,
      posY: pos.y,
      bounds: e.currentTarget.getBoundingClientRect(),
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  }, [disabled, pos]);

  const onPointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.pointerX;
    const dy = e.clientY - dragStartRef.current.pointerY;
    const { bounds } = dragStartRef.current;
    const clampedX = Math.max(12 - bounds.left, Math.min(window.innerWidth - 80 - bounds.left, dx));
    const clampedY = Math.max(34 - bounds.top, Math.min(window.innerHeight - 70 - bounds.top, dy));
    setPos({
      x: dragStartRef.current.posX + clampedX,
      y: dragStartRef.current.posY + clampedY,
    });
  }, []);

  const onPointerUp = useCallback((e) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  }, []);

  return {
    pos,
    setPos,
    resetPos,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
}
