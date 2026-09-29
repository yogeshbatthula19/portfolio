import React, { useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import customCursorImg from './assets/custom_cursor_3d.png';

const CLICKABLE_SELECTORS =
  'a, button, input, textarea, select, [role="button"], [role="link"], [role="tab"], [role="menuitem"], [role="checkbox"], [role="radio"], [role="switch"], label, [data-interactive="true"], .cursor-pointer, [class*="cursor-pointer"], [class*="cursor-zoom"], [tabindex="0"], [onclick], summary, details';

export default function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Raw mouse coordinates (zero lag for cursor arrow tip)
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  useEffect(() => {
    // Only activate on devices with a mouse/trackpad (fine pointer)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const updatePointerType = () => {
      setIsEnabled(mediaQuery.matches);
    };
    updatePointerType();
    mediaQuery.addEventListener?.('change', updatePointerType);

    const onMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Detect hover over interactive/clickable elements
      const target = e.target;
      if (target && target instanceof Element) {
        const isInteractive = Boolean(target.closest(CLICKABLE_SELECTORS));
        setIsHovered(isInteractive);
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    return () => {
      mediaQuery.removeEventListener?.('change', updatePointerType);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  // Toggle custom cursor class on body to suppress default system cursor
  useEffect(() => {
    if (isEnabled && isVisible) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }
    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isEnabled, isVisible]);

  if (!isEnabled) return null;

  // Exact pointer tip hotspot calibration for 1024x1024 source image:
  // Sharp arrow tip is at (270, 96) -> 26.367% from left, 9.375% from top.
  // Compact resting size: 27px (sharp, sleek)
  const cursorSize = 27;
  const tipOffsetX = cursorSize * 0.26367;
  const tipOffsetY = cursorSize * 0.09375;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[999999] will-change-transform"
      style={{
        x: mouseX,
        y: mouseY,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      aria-hidden="true"
    >
      {/* Scaled & offset cursor container with transformOrigin centered on pointer tip */}
      <motion.div
        animate={{
          scale: isMouseDown ? (isHovered ? 1.25 : 0.88) : (isHovered ? 1.45 : 1),
          rotate: isMouseDown ? -3 : isHovered ? 3 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 420,
          damping: 28,
          mass: 0.2,
        }}
        style={{
          transformOrigin: `${tipOffsetX}px ${tipOffsetY}px`,
          transform: `translate(-${tipOffsetX}px, -${tipOffsetY}px)`,
        }}
        className="relative select-none pointer-events-none"
      >
        <img
          src={customCursorImg}
          alt=""
          width={cursorSize}
          height={cursorSize}
          draggable={false}
          className="select-none pointer-events-none"
          style={{
            width: `${cursorSize}px`,
            height: `${cursorSize}px`,
            maxWidth: 'none',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
