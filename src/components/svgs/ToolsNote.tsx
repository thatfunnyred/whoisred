import { useId } from "react";

// npm i react (no other dependencies)
// Import whichever note(s) you need:
//   import { QuickStatsNote, FavoritesNote, LegendNote } from "./StickyNotes";

export interface StickyNoteProps {
  id?: string;
  className?: string;
}

export function QuickStatsNote({ id, className }: StickyNoteProps) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg id={id} className={className} viewBox="0 0 340 300" width="340" height="300" xmlns="http://www.w3.org/2000/svg" filter="url(#crayon)">
      <defs>
        <filter id={`qs-wobble-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.022" numOctaves={2} seed={4} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={7} />
        </filter>
        <filter id={`qs-blur-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation={5} />
        </filter>
      </defs>

      <g transform="rotate(4 170 150)">
        <rect x={22} y={24} width={300} height={256} rx={16} fill="#000" fillOpacity={0.22} filter={`url(#qs-blur-${uid})`} />
        <rect
          x={14}
          y={14}
          width={300}
          height={256}
          rx={16}
          fill="#F4C93B"
          stroke="#1c1712"
          strokeWidth={4}
          filter={`url(#qs-wobble-${uid})`}
        />

        <g transform="rotate(-8 110 14)">
          <rect x={78} y={-6} width={66} height={24} rx={2} fill="#3a3a3a" fillOpacity={0.6} stroke="#222" strokeOpacity={0.35} strokeWidth={0.5} />
          <rect x={83} y={-2} width={56} height={4} fill="#fff" fillOpacity={0.16} />
        </g>

        <text x={34} y={76} fontFamily="'Arial Black', Impact, sans-serif" fontWeight={900} fontSize={28} letterSpacing={0.5} fill="#1c1712">
          QUICK STATS
        </text>
        <path d="M32,86 L228,86" stroke="#1c1712" strokeWidth={3} strokeLinecap="round" fill="none" />
        <path d="M32,94 Q64,90 96,94 T160,94" stroke="#E14A22" strokeWidth={2.5} strokeLinecap="round" fill="none" />

        <g className="jersey-25-regular" fontWeight={700} fontSize={16} fill="#1c1712" letterSpacing={0.3}>
          <text x={34} y={134} fill="#E14A22" fontWeight={900}>
            →
          </text>
          <text x={56} y={134}>20+ TECHNOLOGIES</text>

          <text x={34} y={168} fill="#E14A22" fontWeight={900}>
            →
          </text>
          <text x={56} y={168}>5+ ENGINES</text>

          <text x={34} y={202} fill="#E14A22" fontWeight={900}>
            →
          </text>
          <text x={56} y={202}>10+ LANGUAGES</text>

          <text x={34} y={236} fill="#E14A22" fontWeight={900}>
            →
          </text>
          <text x={56} y={236}>∞ POSSIBILITIES</text>
        </g>
      </g>
    </svg>
  );
}

export function FavoritesNote({ id, className }: StickyNoteProps) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg id={id} className={className} viewBox="0 0 340 330" width="340" height="330" xmlns="http://www.w3.org/2000/svg" filter="url(#crayon)">
      <defs>
        <filter id={`fv-wobble-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.017 0.021" numOctaves={2} seed={9} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={7} />
        </filter>
        <filter id={`fv-blur-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation={5} />
        </filter>
      </defs>

      <g transform="rotate(-3 170 165)">
        <rect x={22} y={26} width={300} height={282} rx={16} fill="#000" fillOpacity={0.22} filter={`url(#fv-blur-${uid})`} />
        <rect
          x={14}
          y={16}
          width={300}
          height={282}
          rx={16}
          fill="#F2A0A6"
          stroke="#1c1712"
          strokeWidth={4}
          filter={`url(#fv-wobble-${uid})`}
        />

        <g transform="rotate(6 240 16)">
          <rect x={208} y={-6} width={66} height={24} rx={2} fill="#3a3a3a" fillOpacity={0.6} stroke="#222" strokeOpacity={0.35} strokeWidth={0.5} />
          <rect x={213} y={-2} width={56} height={4} fill="#fff" fillOpacity={0.16} />
        </g>

        <text x={34} y={80} fontFamily="'Arial Black', Impact, sans-serif" fontWeight={900} fontSize={28} letterSpacing={0.5} fill="#1c1712">
          FAVORITES
        </text>
        <path d="M32,90 L228,90" stroke="#1c1712" strokeWidth={3} strokeLinecap="round" fill="none" />
        <path d="M32,98 Q64,94 96,98 T160,98 T224,98" stroke="#E14A22" strokeWidth={2.5} strokeLinecap="round" fill="none" />

        <g className="jersey-25-regular" fontWeight={700} fontSize={22.5} fill="#1c1712" letterSpacing={0.3}>
          <text x={34} y={142} fontSize={18}>⦿</text>
          <text x={59} y={142}>Unity</text>

          <text x={34} y={174} fontSize={18}>⦿</text>
          <text x={59} y={174}>C#</text>

          <text x={34} y={206} fontSize={18}>⦿</text>
          <text x={59} y={206}>React</text>

          <text x={34} y={238} fontSize={18}>⦿</text>
          <text x={59} y={238}>Blender</text>

          <text x={34} y={270} fontSize={18}>⦿</text>
          <text x={59} y={270}>Godot</text>
        </g>
      </g>
    </svg>
  );
}

export function LegendNote({ id, className }: StickyNoteProps) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg id={id} className={`${className} geist-pixel-uniquifier`} viewBox="0 0 300 340" width="300" height="340" xmlns="http://www.w3.org/2000/svg" filter="url(#crayon)">
      <defs>
        <filter id={`lg-wobble-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.022" numOctaves={2} seed={12} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={7} />
        </filter>
        <filter id={`lg-blur-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation={5} />
        </filter>
      </defs>

      <g transform="rotate(-2 150 170)">
        <rect x={22} y={24} width={256} height={292} rx={16} fill="#000" fillOpacity={0.2} filter={`url(#lg-blur-${uid})`} />
        <rect
          x={14}
          y={14}
          width={256}
          height={292}
          rx={16}
          fill="#F3ECDC"
          stroke="#1c1712"
          strokeWidth={4}
          filter={`url(#lg-wobble-${uid})`}
        />

        <g transform="rotate(-8 90 14)">
          <rect x={60} y={-6} width={62} height={24} rx={2} fill="#3a3a3a" fillOpacity={0.55} stroke="#222" strokeOpacity={0.35} strokeWidth={0.5} />
          <rect x={65} y={-2} width={52} height={4} fill="#fff" fillOpacity={0.16} />
        </g>

        <g fontWeight={700} fontSize={16} fill="#1c1712" letterSpacing={0.3}>
          <circle cx={44} cy={56} r={8} fill="#FF8A3D" stroke="#1c1712" strokeWidth={1.5} />
          <text x={64} y={61}>GAME ENGINES</text>

          <circle cx={44} cy={98} r={8} fill="#FFD23F" stroke="#1c1712" strokeWidth={1.5} />
          <text x={64} y={103}>LANGUAGES</text>

          <circle cx={44} cy={140} r={8} fill="#FF6FA5" stroke="#1c1712" strokeWidth={1.5} />
          <text x={64} y={145}>WEB</text>

          <circle cx={44} cy={182} r={8} fill="#4DA3FF" stroke="#1c1712" strokeWidth={1.5} />
          <text x={64} y={187}>CREATIVE / 3D</text>

          <circle cx={44} cy={224} r={8} fill="#47D18C" stroke="#1c1712" strokeWidth={1.5} />
          <text x={64} y={229}>TOOLS</text>

          <circle cx={44} cy={266} r={8} fill="#B389F9" stroke="#1c1712" strokeWidth={1.5} />
          <text x={64} y={271}>SPECIAL</text>
        </g>
      </g>
    </svg>
  );
}