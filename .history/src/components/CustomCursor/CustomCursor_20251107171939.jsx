import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [click, setClick] = useState(false);

  useEffect(() => {
    const move = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const down = () => setClick(true);
    const up = () => setClick(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  const styleAura = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
  };

  const styleCore = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
  };

  const cursor = (
    <>
      <div className={`${styles.cursorAura} ${click ? styles.cursorClick : ""}`} style={styleAura}></div>
      <div className={`${styles.cursorCore} ${click ? styles.cursorClick : ""}`} style={styleCore}></div>
    </>
  );

  return ReactDOM.createPortal(cursor, document.body);
}