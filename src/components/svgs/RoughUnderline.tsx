export default function RoughUnderline({ id }: { id: string }) {
  return (
    <svg id={id} viewBox="0 0 200 100" width="180" height="90">
      <path
        d="M15 50 C 40 20, 60 80, 85 50 C 110 20, 130 80, 155 50 C 170 35, 175 60, 185 45"
        fill="none"
        stroke="#d53e0f"
        strokeWidth={5}
        strokeLinecap="round"
        filter="url(#crayon)"
      />
    </svg>
  );
}
