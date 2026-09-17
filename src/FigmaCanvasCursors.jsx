import React, { useState, useRef, useEffect } from 'react';
import './FigmaCanvasCursors.css';

// SVG cursor pointer tip matching Figma's classic multiplayer pointer
function FigmaPointer({ color }) {
  return (
    <svg className="figma-cursor-icon" viewBox="0 0 16 16" width="16" height="16" fill="none">
      <path
        d="M1.5 1.5L6.8 14.5L9.2 9.2L14.5 6.8L1.5 1.5Z"
        fill={color}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SelectionBoxHandles() {
  return (
    <>
      <span className="figma-handle figma-handle-tl" />
      <span className="figma-handle figma-handle-tr" />
      <span className="figma-handle figma-handle-bl" />
      <span className="figma-handle figma-handle-br" />
    </>
  );
}

export default function FigmaCanvasCursors() {
  const stageRef = useRef(null);
  const [userPos, setUserPos] = useState(null);
  const [userClickBox, setUserClickBox] = useState(null);

  const handlePointerMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setUserPos({ x, y });
    } else {
      setUserPos(null);
    }
  };

  const handlePointerLeave = () => {
    setUserPos(null);
  };

  const handleStageClick = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const boxW = Math.min(140, rect.width * 0.28);
    const boxH = Math.min(90, rect.height * 0.75);
    const left = Math.max(10, Math.min(rect.width - boxW - 10, x - boxW / 2));
    const top = Math.max(10, Math.min(rect.height - boxH - 10, y - boxH / 2));

    setUserClickBox({ left, top, width: boxW, height: boxH, id: Date.now() });
  };

  useEffect(() => {
    if (userClickBox) {
      const timer = setTimeout(() => setUserClickBox(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [userClickBox]);

  return (
    <div
      ref={stageRef}
      className="figma-collab-layer"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleStageClick}
      aria-hidden="true"
    >
      {/* Selection Box 1 (Dhruv A's selection on left letters "Port", tilted -4deg) */}
      <div className="figma-selection-box figma-box-dhruv">
        <SelectionBoxHandles />
      </div>

      {/* Selection Box 2 (Marcus L's selection on right letters "lio") */}
      <div className="figma-selection-box figma-box-marcus">
        <SelectionBoxHandles />
      </div>

      {/* Interactive User Selection Box (on click) */}
      {userClickBox && (
        <div
          className="figma-selection-box figma-user-box"
          style={{
            left: `${userClickBox.left}px`,
            top: `${userClickBox.top}px`,
            width: `${userClickBox.width}px`,
            height: `${userClickBox.height}px`,
          }}
        >
          <SelectionBoxHandles />
        </div>
      )}

      {/* Dhruv A Cursor (Purple) */}
      <div className="figma-cursor figma-cursor-dhruv">
        <FigmaPointer color="#8B5CF6" />
        <div className="figma-badge" style={{ backgroundColor: '#8B5CF6' }}>
          Dhruv A
        </div>
      </div>

      {/* Marcus L Cursor (Green) */}
      <div className="figma-cursor figma-cursor-marcus">
        <FigmaPointer color="#10B981" />
        <div className="figma-badge" style={{ backgroundColor: '#10B981' }}>
          Marcus L
        </div>
      </div>

      {/* Zaria Z Cursor (Hot Pink) */}
      <div className="figma-cursor figma-cursor-zaria">
        <FigmaPointer color="#EC4899" />
        <div className="figma-badge" style={{ backgroundColor: '#EC4899' }}>
          Zaria Z
        </div>
      </div>

      {/* Interactive User Cursor ("You") when hovering over portfolio */}
      {userPos && (
        <div
          className="figma-cursor figma-user-cursor"
          style={{
            transform: `translate3d(${userPos.x}px, ${userPos.y}px, 0)`,
          }}
        >
          <FigmaPointer color="#0D99FF" />
          <div className="figma-badge" style={{ backgroundColor: '#0D99FF' }}>
            You
          </div>
        </div>
      )}
    </div>
  );
}
