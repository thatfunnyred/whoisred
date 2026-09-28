import "../../styles/components/sticky.css";

interface StickyProps {
  id: string;
  className: string;
  title: string;
  children: React.ReactNode;
  rotation: string;
}

export default function Sticky4({ id, className, title, children, rotation }: StickyProps) {
  return (
    <div id={id} className={className} style={{transform: `rotate(${rotation})`}}>
      <div className="tape v4-tape-l grain" />
      <div className="tape v4-tape-r grain" />

      <div className="sticky v4 grain">
        <b>{title}</b>
        {children}
      </div>

      <svg
        className="crayon-outline v4-outline"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        filter="url(#crayonWobble)"
      >
        <path d="M1.5,1.6 L22.1,0 L41.9,.8 L66.5,1.3 L88.3,1.4 L98.9,12.6 L100,32.9 L100,56.5 L98.5,78 L100,98.8 L79.3,100 L57.3,99.2 L31.3,100 L12.6,99.7 L0,87.4 L.7,65.6 L2.3,44.9 L0,23 Z" />
      </svg>
    </div>
  );
}
