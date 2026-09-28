import { useId } from "react";

// npm i react (no other dependencies)
//
// Usage — sits absolutely behind your grid of ExperimentNote cards:
//   <div style={{ position: "relative" }}>
//     <PinBoard style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />
//     <div style={{ position: "relative", zIndex: 1, padding: "60px 40px" }}>
//       {/* ...cards... */}
//     </div>
//   </div>

export interface PinBoardProps {
  id?: string;
  className?: string;
}

export function PinBoard({ id, className }: PinBoardProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      id={id}
      className={className}
      viewBox="0 0 1200 640"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={`pb-wobble-frame-${uid}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves={2} seed={6} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={9} />
        </filter>
        <filter id={`pb-wobble-board-${uid}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.014 0.018" numOctaves={2} seed={17} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={8} />
        </filter>
        <filter id={`pb-blur-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={8} />
        </filter>
        <filter id={`pb-grain-${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={3} result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0" />
        </filter>
        <pattern id={`pb-grid-${uid}`} width={40} height={40} patternUnits="userSpaceOnUse">
          <path d="M40,0 L0,0 L0,40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        </pattern>
      </defs>

      {/* lifted-off-the-wall shadow */}
      <rect x={26} y={34} width={1160} height={596} rx={20} fill="#000" fillOpacity={0.28} filter={`url(#pb-blur-${uid})`} />

      {/* kraft-paper frame */}
      <rect
        x={10}
        y={10}
        width={1180}
        height={620}
        rx={14}
        fill="#C9A876"
        stroke="#1c1712"
        strokeWidth={3}
        filter={`url(#pb-wobble-frame-${uid})`}
      />

      {/* dark corkboard interior */}
      <rect
        x={28}
        y={28}
        width={1144}
        height={584}
        rx={8}
        fill="#171310"
        stroke="#1c1712"
        strokeWidth={2.5}
        filter={`url(#pb-wobble-board-${uid})`}
      />
      <rect x={28} y={28} width={1144} height={584} rx={8} fill={`url(#pb-grid-${uid})`} />
      <rect x={28} y={28} width={1144} height={584} rx={8} fill="#fff" filter={`url(#pb-grain-${uid})`} />

      {/* corner tape */}
      <g transform="rotate(-7 105 22)">
        <rect x={60} y={6} width={90} height={30} rx={2} fill="#B7A489" fillOpacity={0.85} stroke="#1c1712" strokeOpacity={0.3} strokeWidth={1} />
        <rect x={68} y={12} width={74} height={5} fill="#fff" fillOpacity={0.18} />
      </g>
      <g transform="rotate(6 1095 22)">
        <rect x={1050} y={6} width={90} height={30} rx={2} fill="#B7A489" fillOpacity={0.85} stroke="#1c1712" strokeOpacity={0.3} strokeWidth={1} />
        <rect x={1058} y={12} width={74} height={5} fill="#fff" fillOpacity={0.18} />
      </g>
    </svg>
  );
}