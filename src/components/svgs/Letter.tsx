
export interface LetterProps{
  id?: string;
  className?: string;
}

export default function Letter({ id, className }: LetterProps) {
  return (
    <svg
        id={id}
        className={className}
        viewBox="0 0 180 140"
        role="img"
        aria-label="Pink postage stamp frame"
        filter="url(#crayon)"
      >

        <path
          d="
            M22 24

            L28 24 L31 20 L34 24
            L41 24 L44 20 L47 24
            L54 24 L57 20 L60 24
            L67 24 L70 20 L73 24
            L80 24 L83 20 L86 24
            L93 24 L96 20 L99 24
            L106 24 L109 20 L112 24
            L119 24 L122 20 L125 24
            L132 24 L135 20 L138 24
            L145 24 L148 20 L151 24
            L158 24

            L158 30 L162 33 L158 36
            L158 43 L162 46 L158 49
            L158 56 L162 59 L158 62
            L158 69 L162 72 L158 75
            L158 82 L162 85 L158 88
            L158 95 L162 98 L158 101
            L158 108 L162 111 L158 114

            L151 114 L148 118 L145 114
            L138 114 L135 118 L132 114
            L125 114 L122 118 L119 114
            L112 114 L109 118 L106 114
            L99 114 L96 118 L93 114
            L86 114 L83 118 L80 114
            L73 114 L70 118 L67 114
            L60 114 L57 118 L54 114
            L47 114 L44 118 L41 114
            L34 114 L31 118 L28 114
            L22 114

            L22 108 L18 105 L22 102
            L22 95 L18 92 L22 89
            L22 82 L18 79 L22 76
            L22 69 L18 66 L22 63
            L22 56 L18 53 L22 50
            L22 43 L18 40 L22 37
            L22 30 L18 27 L22 24
            Z
          "
          fill="#f4a6b8"
          stroke="#171717"
          stroke-width="3"
          stroke-linejoin="round"
        />

        <path
          d="M31 34 C62 31 117 34 149 32
             M30 103 C66 106 116 103 149 105"
          fill="none"
          stroke="#171717"
          stroke-width="1.5"
          opacity=".55"
          stroke-linecap="round"
        />
      </svg>
  );
}