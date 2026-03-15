import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.left  = mx + "px";
        dot.current.style.top   = my + "px";
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (ring.current) {
        ring.current.style.left = rx + "px";
        ring.current.style.top  = ry + "px";
      }
      requestAnimationFrame(tick);
    };

    // Grow ring on hoverable elements
    const grow   = () => { if (ring.current) { ring.current.style.width = "64px"; ring.current.style.height = "64px"; ring.current.style.opacity = ".7"; } };
    const shrink = () => { if (ring.current) { ring.current.style.width = "42px"; ring.current.style.height = "42px"; ring.current.style.opacity = "1"; } };

    document.querySelectorAll("a,button,.card").forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    window.addEventListener("mousemove", onMove);
    requestAnimationFrame(tick);

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="cursor">
      <div className="cursor__dot" ref={dot} />
      <div className="cursor__ring" ref={ring}>
        <span className="cursor__arm-tr" />
        <span className="cursor__arm-tl" />
        <span className="cursor__arm-bl" />
        <span className="cursor__arm-br" />
      </div>
    </div>
  );
}
