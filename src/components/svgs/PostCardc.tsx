export interface PostcardProps {
  id?: string;
  title?: string;
  lines?: string[];
  image?: string;
  paper?: string;
  rotation?: string;
  frameColor?: string;
  ink?: string;
  inkSoft?: string;
  leftBurstColor?: string;
  rightBurstColor?: string;
  width?: number | string;
  className?: string;
}

export default function Postcard({
  id = "postcard",
  title = "Game Prototype",
  lines = ["A playful idea explored", "through interactive design."],
  image,
  rotation = "0deg",
  paper = "#f6ecd9",
  frameColor = "#000000",
  ink = "#2b2420",
  inkSoft = "#4a4038",
  width = 360,
  className = "",
}: PostcardProps) {
  const clipId = `${id}-image-clip`;

  return (
    <svg
      id={id}
      viewBox="0 0 400 310"
      width={width}
      className={className}
      filter="url(#crayonWobble) url(#crayonWobble)"
      style={{ display: "block", transform: `scale(0.9) rotate(${rotation})`}}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="34" y="26" width="332" height="154" rx="2" />
        </clipPath>
      </defs>

      <polygon
        points="
          12,8 48,2 95,7 130,3 180,9 230,4 270,8 310,2 350,7 388,9
          384,45 390,90 385,130 389,175 384,215 390,255 386,296
          350,302 310,297 265,303 215,298 170,304 120,297 75,302 35,298 12,296
          16,260 10,220 15,180 9,140 16,100 10,60 14,30
        "
        fill={paper}
      />


      <rect x="31" y="23" width="338" height="160" rx="2" fill={frameColor} />

      <g clipPath={`url(#${clipId})`}>
        {image ? (
          <image
            href={image}
            x="34"
            y="26"
            width="332"
            height="154"
            preserveAspectRatio="xMidYMid slice"
          />
        ) : (
          <rect x="34" y="26" width="332" height="154" fill="#d9d3c4" />
        )}
      </g>

      <text x="30" y="218" fontFamily="'Permanent Marker', cursive" fontSize="26" fill={ink}>
        {title}
      </text>

      {lines.map((line, i) => (
        <text
          key={i}
          x="30"
          y={244 + i * 20}
          fontFamily="'Patrick Hand', sans-serif"
          fontSize="16"
          fill={inkSoft}
        >
          {line}
        </text>
      ))}
    </svg>
  );
}
