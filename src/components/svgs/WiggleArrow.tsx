export default function WiggleArrow({ id }: { id: string }) {
  return (
    <svg id={id} viewBox="0 0 160 200" width="130" height="165">
      <path
        d="M80 10 C 130 10, 130 60, 90 65 C 55 68, 55 30, 85 32 C 115 34, 100 90, 80 110 C 60 130, 75 160, 90 180"
        fill="none"
        stroke="#F2C230"
        strokeWidth={7}
        strokeLinecap="round"
        filter="url(#crayonSoft)"
      />
      <path
        d="M65 165 L 88 185 L 108 160"
        fill="none"
        stroke="#F2C230"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#crayonSoft)"
      />
    </svg>
  );
}
