export interface HighlightCircleProps{
  id?: string;
  className?: string;
}

export default function HighlightCircle({ id, className }: HighlightCircleProps) {
  return (
    <svg id={id} 
    className={className} 
    width="100%" 
    viewBox="0 0 680 320" 
    role="img" 
    xmlns="http://www.w3.org/2000/svg" 
    filter="url(#crayon)"
    >
        <path
  d="M 400 90
  C 355 72, 305 65, 260 72
  C 218 79, 178 97, 152 124
  C 128 149, 116 178, 126 206
  C 137 236, 166 258, 205 272
  C 248 287, 298 289, 344 280
  C 392 271, 436 250, 462 217
  C 486 187, 492 152, 472 122
  C 456 98, 428 82, 396 74"
  fill="none"
  stroke="var(--highlight-color)"
  strokeWidth={12}
  strokeLinecap="round"
  strokeLinejoin="round"
  filter="url(#crayon)"
    />
    </svg>
  );
}