import { useEffect, useState } from "react";

export default function MouseFollower() {
    const [enabled, setEnabled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    if (enabled) {
        window.addEventListener("mousemove", handleMouseMove);
      }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [enabled]);

  return (
    <>
    <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
      }}
      />
    <div className="mouse-follower">
      <h1>Mouse Follower</h1>
      <p>
        <strong>Mouse position:</strong> {mousePosition.x}, {mousePosition.y}
      </p>
    </div>
    <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Disable' : 'Enable'} mouse follower
      </button>
    </>
  );
}