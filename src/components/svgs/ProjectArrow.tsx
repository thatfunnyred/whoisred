export default function ProjectArrow({ id }: { id: string }) {
  return (
    <svg id={id} viewBox="0 0 24 24">
      <line filter="url(#crayon)" x1="5" y1="19" x2="19" y2="5" />
      <polyline filter="url(#crayon)" points="8 5 19 5 19 16" />
    </svg>
  );
}
