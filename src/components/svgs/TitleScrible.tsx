export default function TitleScrible({ id }: { id: string }) {
  return (
    <svg
      id={id}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        filter="url(#crayon)"
        stroke="#111"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M40 24 Q40 13 40 2" />

        <path d="M28 28 Q21 16 14 4" />

        <path d="M52 28 Q59 16 66 4" />
      </g>
    </svg>
  );
}
