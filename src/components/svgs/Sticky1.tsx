import "../../styles/components/sticky.css";

interface Sticky1Props {
  id: string;
  className: string;
  title: string;
  children: React.ReactNode;
  rotation: string;
}

export default function Sticky1({ id, className, title, children, rotation }: Sticky1Props) {
  return (
    <div id={id} className={className} style={{transform: `rotate(${rotation})`}}>
      <div className="tape v1-tape grain" />

      <div className="sticky v1 grain">
        <b>{title}</b>
        {children}
      </div>

      <svg
        className="crayon-outline v1-outline"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        filter="url(#crayonWobble)"
      >
        <path d="M0,1.7 L23.5,0 L44.4,0 L67.4,1.4 L86.9,0 L100,10.8 L100,30.8 L99.7,56.7 L98.6,80 L100,97.7 L75.4,100 L57.8,99.4 L31.9,99.6 L8.8,98.6 L0,88.9 L0,65.3 L0,44.2 L0,19.8 Z" />
      </svg>
    </div>
  );
}
