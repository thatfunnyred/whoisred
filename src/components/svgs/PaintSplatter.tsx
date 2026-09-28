import type { SplatterShape } from "../../data/paintSplatters";

export default function PaintSplatter({
  id,
  viewBox,
  shapes,
  fill = "#161616",
}: {
  id: string;
  viewBox: string;
  shapes: SplatterShape[];
  fill?: string;
}) {
  return (
    <svg id={id} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
      <g fill={fill} filter="url(#crayon)">
        {shapes.map((shape, i) =>
          shape.type === "path" ? (
            <path key={i} d={shape.d} />
          ) : (
            <circle key={i} cx={shape.cx} cy={shape.cy} r={shape.r} />
          ),
        )}
      </g>
    </svg>
  );
}
