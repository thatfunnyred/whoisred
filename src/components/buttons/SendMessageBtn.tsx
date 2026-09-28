import { useNavigate } from "react-router-dom";

interface SendMessageBtnProps {
  id: string;
  className?: string;
  label?: string;
  onClick?: () => void;
}

export default function SendMessageBtn({
  id = "",
  label = "SEND A MESSAGE",
  onClick,
  className = "",
}: SendMessageBtnProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    navigate("/contact");
  };

  return (
    <button
      id={id}
      type="button"
      onClick={handleClick}
      className={`send-message-btn ${className}`}
      aria-label={label} 
    >
      <svg
        width="300"
        height="70"
        viewBox="0 0 300 70"
        xmlns="http://www.w3.org/2000/svg"
        filter="url(#crayon)"
      >
        <defs>
          <filter id="sendBtnWobble" x="-10%" y="-30%" width="120%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.09"
              numOctaves={2}
              seed={7}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={4.5}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <rect
          x="4"
          y="4"
          width="292"
          height="62"
          rx="10"
          fill="#1a1a1a"
          filter="url(#sendBtnWobble)"
        />

        <text
          className="jersey-25-regular"
          x="130"
          y="42"
          textAnchor="middle"
          fill="#f5f1e3"
          fontSize="19"
          fontWeight="bold"
          letterSpacing="1"
        >
          {label}
        </text>

        <g
          filter="url(#sendBtnWobble)"
          stroke="#f5f1e3"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <line x1="240" y1="34" x2="262" y2="34" />
          <polyline points="254,26 262,34 254,42" />
        </g>
      </svg>

      <style>{`
        .send-message-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: block;
          filter: drop-shadow(0 2px 0 rgba(0,0,0,0.15));
          transition: transform 0.15s ease;
        }
        .send-message-btn:hover {
          transform: translateY(-2px);
        }
        .send-message-btn:active {
          transform: translateY(1px) scale(0.98);

          & text {
            font-size: 18px;
          }
        }
      `}</style>
    </button>
  );
}
