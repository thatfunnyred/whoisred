
export interface SwigglyLineProps{
  id?: string;
  className?: string;
}

export default function SwigglyLine({ id, className }: SwigglyLineProps) {
  return (
    <svg
      id={id}
      className={className} 
      viewBox="0 0 420 100"
      role="img"
      aria-label="Orange hand-drawn squiggle underline"
      filter="url(#crayon)"
    >
        <path
          fill="none"
          stroke="var(--highlight-color)"
          stroke-width="3"
          d="
            M18 55
            C32 43, 43 67, 57 54
            C70 42, 82 66, 96 53
            C110 41, 122 65, 137 53
            C151 41, 163 65, 178 53
            C193 41, 205 65, 220 53
            C235 41, 247 65, 262 53
            C277 41, 289 65, 304 53
            C319 41, 331 65, 346 53
            C360 42, 373 64, 388 52
            C397 46, 404 50, 407 53
          "
        />
    </svg>
  );
}