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
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path id="stroke-1" d="M40 24 Q40 13 40 2" />

        <path id="stroke-2" d="M28 28 Q21 16 14 4" />

        <path id="stroke-3" d="M52 28 Q59 16 66 4" />
      </g>
    </svg>
  );
}
