import "../../styles/components/sticky.css";

interface StickyProps {
  id: string;
  className: string;
  title: string;
  children: React.ReactNode;
  rotation: string;
}

export default function Sticky3({ id, className, title, children, rotation }: StickyProps) {
  return (
    <div id={id} className={className} style={{transform: `rotate(${rotation})`}}>
      <div className="sticky v3-back grain" />

      <svg
        className="crayon-outline v3-back-outline"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        filter="url(#crayonWobble)"
      >
        <path d="M0,0.2 L21.6,0.5 L45.1,0 L64.2,1.7 L87.7,0 L100,11 L100,33.2 L100,53.8 L100,79.6 L100,100 L78.6,97.8 L56.8,100 L32.3,97.7 L12.9,99.9 L1.1,90.8 L1.1,68.8 L0,45.9 L0,24.4 Z" />
      </svg>

      <div className="tape v3-tape grain" />

      <div className="sticky v3-front grain">
        <b>{title}</b>
        {children}
      </div>

      <svg
        className="crayon-outline v3-front-outline"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        filter="url(#crayonWobble)"
      >
        <path d="M0,0 L21.7,0 L42.3,0 L68.8,1.5 L90.2,0 L100,10 L98.4,31.4 L98.6,57.7 L100,79.3 L100,98.5 L76.8,100 L56.7,100 L35.2,97.9 L11.6,100 L0,87.3 L0,64.6 L2.2,46.3 L0.2,21.2 Z" />
      </svg>
    </div>
  );
}
