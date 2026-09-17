export interface DoubleUnderlineProps{
  id?: string;
  className?: string;
}

export default function DoubleUnderline({ id, className }: DoubleUnderlineProps) {
  return (
    <svg id={id} className={className} viewBox="0 0 240 32" width="100%">
      <path
        d="M6,18 C40,10 70,24 110,15 C150,7 190,22 234,14"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#crayon)"
      />
      <path
        d="M4,14 C45,22 85,9 125,19 C165,26 195,12 236,20"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        opacity="0.85"
        filter="url(#crayon)"
      />
    </svg>
  );
}