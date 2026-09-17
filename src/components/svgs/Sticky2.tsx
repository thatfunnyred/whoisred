import "../../styles/components/sticky.css";

interface StickyProps {
  id?: string;
  title: string;
  children: React.ReactNode;
  rotation: string;
}

export default function Sticky2({ id, title, children, rotation }: StickyProps) {
  return (
    <div id={id} className={`note-wrap`} style={{transform: `rotate(${rotation})`}}>
      <div className="tape v2-tape-l grain" />
      <div className="tape v2-tape-r grain" />

      <div className="sticky v2 grain">
        <b>{title}</b>
        {children}
      </div>

      <svg
        className="crayon-outline v2-outline"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        filter="url(#crayonWobble)"
      >
        <path d="M2.3,2.2 L20,0 L46.1,1.2 L67.5,0 L89.4,0.5 L100,9.4 L99.7,32.8 L100,58 L100,78 L99.7,98.8 L75.5,97.6 L55.4,99.1 L32.7,100 L11.2,100 L0,86.5 L0,64.9 L0.1,46.9 L0.9,20.6 Z" />
      </svg>
    </div>
  );
}
