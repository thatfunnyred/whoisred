const ROUGH_CIRCLE_PATH_D = `M65 10
C98 15 112 44 109 70
C106 99 83 112 57 109
C28 106 11 84 12 57
C13 28 35 9 65 10Z

M62 16
C88 18 101 40 99 66
C97 91 77 101 55 99
C31 97 19 78 21 54
C23 31 41 14 62 16Z`;

export default function RoughCircle({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  return (
    <svg
      id={id}
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={ROUGH_CIRCLE_PATH_D}
        stroke="#d53e0f"
        strokeWidth={3}
        strokeLinecap="round"
        filter="url(#crayonSoft)"
      />
    </svg>
  );
}
