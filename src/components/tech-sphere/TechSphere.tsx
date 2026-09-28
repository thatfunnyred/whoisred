import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import {
  FILLER_COUNT,
  PERSPECTIVE,
  RADIUS,
  STICKY_COLORS,
  TECHS,
  type Tech,
} from "./data";
import {
  computeNeighbors,
  fibonacciSphere,
  matMul,
  rotX,
  rotY,
  seedRand,
  type Mat3,
  type Point3D,
  type TechPoint,
} from "./geometry";
import TECH_SPHERE_STYLES from "./styles";
export default function TechSphere() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const scheduleFrameRef = useRef<(() => void) | null>(null);
  const rot = useRef({
    m: matMul(rotX(0.35), rotY(0.5)) as Mat3,
    vYaw: 0.0018,
    vPitch: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
  });
  const size = useRef({ w: 0, h: 0 });
  const hovering = useRef(false);
  const [hover, setHover] = useState<{ tech: Tech; x: number; y: number; flip: boolean; rot: number; color: string } | null>(null);

  const { techPoints, allPoints, edges } = useMemo(() => {
    const pts = fibonacciSphere(TECHS.length + FILLER_COUNT, RADIUS);
    const techPoints: TechPoint[] = pts.slice(0, TECHS.length).map((p, i) => ({ ...p, tech: TECHS[i] }));
    const allPoints: Point3D[] = [...techPoints, ...pts.slice(TECHS.length)];
    const edges = computeNeighbors(allPoints, 3);
    return { techPoints, allPoints, edges };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const frameDelay = 1000 / 30 - 1000 / 60;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const edgeBuckets: number[][] = Array.from({ length: 8 }, () => []);
    let raf = 0;
    let timer = 0;
    let inViewport = false;
    let pageVisible = !document.hidden;

    function stopFrame() {
      if (timer !== 0) window.clearTimeout(timer);
      if (raf !== 0) window.cancelAnimationFrame(raf);
      timer = 0;
      raf = 0;
    }

    function scheduleFrame() {
      if (!inViewport || !pageVisible || timer !== 0 || raf !== 0) return;
      timer = window.setTimeout(() => {
        timer = 0;
        raf = window.requestAnimationFrame(frame);
      }, frameDelay);
    }

    scheduleFrameRef.current = scheduleFrame;

    function resize() {
      const rect = stage!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size.current = { w: rect.width, h: rect.height };
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      scheduleFrame();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    function project(p: Point3D, cx: number, cy: number, fitScale: number) {
      const m = rot.current.m;
      const x1 = (m[0] * p.x + m[1] * p.y + m[2] * p.z) * fitScale;
      const y1 = (m[3] * p.x + m[4] * p.y + m[5] * p.z) * fitScale;
      const z1 = (m[6] * p.x + m[7] * p.y + m[8] * p.z) * fitScale;
      const scale = PERSPECTIVE / (PERSPECTIVE + z1);
      return { sx: cx + x1 * scale, sy: cy + y1 * scale, scale };
    }

    function frame() {
      raf = 0;
      if (!inViewport || !pageVisible) return;

      const r = rot.current;
      const shouldRotate =
        !reducedMotion.matches && !r.dragging && !hovering.current;
      if (shouldRotate) {
        r.m = matMul(matMul(rotX(r.vPitch), rotY(r.vYaw)), r.m);
        r.vYaw *= 0.94;
        r.vPitch *= 0.94;
        if (Math.abs(r.vYaw) < 0.0018) r.vYaw = 0.0018;
      }
      const { w, h } = size.current;
      const cx = w / 2;
      const cy = h / 2;
      const fitScale = Math.min(1, Math.min(w, h) / (RADIUS * 2.4));
      const proj = allPoints.map((p) => project(p, cx, cy, fitScale));

      ctx!.clearRect(0, 0, w, h);
      ctx!.lineCap = "round";
      ctx!.setLineDash([5, 4]);
      edgeBuckets.forEach((bucket) => {
        bucket.length = 0;
      });
      edges.forEach(([i, j]) => {
        const a = proj[i];
        const b = proj[j];
        const depth = (a.scale + b.scale) / 2;
        const bucket = edgeBuckets[Math.min(7, Math.floor(depth * 4))];
        bucket.push(a.sx, a.sy, b.sx, b.sy);
      });
      edgeBuckets.forEach((bucket, index) => {
        if (bucket.length === 0) return;
        const depth = (index + 0.5) / 4;
        ctx!.lineWidth = 0.8 + depth * 0.7;
        ctx!.strokeStyle = `rgba(28,23,18,${(0.08 + depth * 0.28).toFixed(3)})`;
        ctx!.beginPath();
        for (let i = 0; i < bucket.length; i += 4) {
          ctx!.moveTo(bucket[i], bucket[i + 1]);
          ctx!.lineTo(bucket[i + 2], bucket[i + 3]);
        }
        ctx!.stroke();
      });
      ctx!.setLineDash([]);
      for (let i = TECHS.length; i < proj.length; i++) {
        const p = proj[i];
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(28,23,18,${(0.18 + p.scale * 0.35).toFixed(3)})`;
        ctx!.arc(p.sx, p.sy, 1.5 * p.scale + 0.5, 0, Math.PI * 2);
        ctx!.fill();
      }

      const compactScale = Math.min(1, w / 400);
      techPoints.forEach((_, i) => {
        const el = nodesRef.current[i];
        if (!el) return;
        const p = proj[i];
        const s = w < 420
          ? Math.max(0.55, Math.min(0.9, p.scale * 0.72) * compactScale)
          : Math.max(0.45, p.scale * 0.95);
        el.style.transform = `translate3d(${p.sx}px, ${p.sy}px, 0) translate(-50%, -50%) scale(${s})`;
        el.style.opacity = (0.35 + p.scale * 0.75).toFixed(2);
        el.style.zIndex = String(Math.round(p.scale * 1000));
      });

      if (shouldRotate) scheduleFrame();
    }

    const handleVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) scheduleFrame();
      else stopFrame();
    };
    const handleMotionPreferenceChange = () => scheduleFrame();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleMotionPreferenceChange);

    const intersectionObserver = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          inViewport = entry.isIntersecting;
          if (inViewport) scheduleFrame();
          else stopFrame();
        }, { rootMargin: "120px" })
      : null;

    if (intersectionObserver) {
      intersectionObserver.observe(stage);
    } else {
      inViewport = true;
      scheduleFrame();
    }

    return () => {
      stopFrame();
      scheduleFrameRef.current = null;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
      intersectionObserver?.disconnect();
      ro.disconnect();
    };
  }, [allPoints, edges, techPoints]);

  function onPointerDown(e: PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId);
    Object.assign(rot.current, { dragging: true, lastX: e.clientX, lastY: e.clientY, vYaw: 0, vPitch: 0 });
  }
  function onPointerMove(e: PointerEvent) {
    if (!rot.current.dragging) return;
    const dx = e.clientX - rot.current.lastX;
    const dy = e.clientY - rot.current.lastY;
    const dYaw = -dx * 0.005; // negative: dragging right turns the near face right
    const dPitch = dy * 0.005;
    rot.current.m = matMul(matMul(rotX(dPitch), rotY(dYaw)), rot.current.m);
    rot.current.vYaw = dYaw;
    rot.current.vPitch = dPitch;
    rot.current.lastX = e.clientX;
    rot.current.lastY = e.clientY;
    scheduleFrameRef.current?.();
  }
  function onPointerUp() {
    rot.current.dragging = false;
    scheduleFrameRef.current?.();
  }

  function showTooltip(i: number, el: HTMLDivElement) {
    const rect = el.getBoundingClientRect();
    const stageRect = stageRef.current!.getBoundingClientRect();
    const flip = rect.top - stageRect.top < 120;
    setHover({
      tech: techPoints[i].tech,
      x: rect.left - stageRect.left + rect.width / 2,
      y: rect.top - stageRect.top,
      flip,
      rot: (seedRand(i + 100) - 0.5) * 8,
      color: STICKY_COLORS[Math.floor(seedRand(i + 200) * STICKY_COLORS.length)],
    });
  }

  return (
    <div className="ts-wrap">
      <style>{TECH_SPHERE_STYLES}</style>

      <div
        className="ts-stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <svg className="ts-burst" viewBox="0 0 40 40" width="30" height="30" style={{ top: -8, right: -2 }} aria-hidden="true">
        </svg>
        <svg
          className="ts-burst"
          viewBox="0 0 40 40"
          width="30"
          height="30"
          style={{ bottom: -8, left: -2, transform: "rotate(180deg)" }}
          aria-hidden="true"
        >
        </svg>

        <canvas className="ts-mesh" ref={canvasRef} />
        <div className="ts-nodes">
          {techPoints.map((tp, i) => {
            const Icon = tp.tech.icon;
            const labelRot = (seedRand(i) - 0.5) * 6;
            return (
              <div
                key={tp.tech.name}
                ref={(el) => {
                  nodesRef.current[i] = el;
                }}
                className="ts-node"
                onMouseEnter={(e) => {
                  hovering.current = true;
                  showTooltip(i, e.currentTarget);
                  (e.currentTarget.children[0] as HTMLElement).style.backgroundColor = tp.tech.color;
                }}
                onMouseLeave={(e) => {
                  hovering.current = false;
                  setHover(null);
                  (e.currentTarget.children[0] as HTMLElement).style.backgroundColor = "#FBF6EA";
                  scheduleFrameRef.current?.();

                }}
              >
                <div className="ts-badge">
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div className="ts-label" style={{ transform: `rotate(${labelRot}deg)` }}>
                  {tp.tech.name}
                </div>
              </div>
            );
          })}
        </div>

        {hover && (
          <div
            className="ts-tooltip"
            style={{
              left: hover.x,
              top: hover.flip ? hover.y + 48 : hover.y - 16,
              transform: `translate(-50%, ${hover.flip ? "0" : "-100%"}) rotate(${hover.rot}deg)`,
              background: hover.color,
            }}
          >
            <div className="ts-tape" />
            <b>{hover.tech.name}</b>
            <p>{hover.tech.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}
