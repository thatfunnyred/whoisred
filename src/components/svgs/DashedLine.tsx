
export interface DashedLineProps{
  id?: string;
  className?: string;
}

export default function DashedLine({ id, className }: DashedLineProps) {
  return (
    <svg id={id} 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
     width="647" 
     height="170" 
     viewBox="0 0 647 170">
        <path
            d="M 12,63
            C 130,98 153,91 176,83
            C 43,78 72,89 103,94
            C 194,77 208,76 219,84
            C 229,91 230,103 223,111
            C 216,119 204,119 198,111
            C 192,103 195,92 204,88
            C 214,83 228,86 240,95
            C 253,105 266,108 279,103
            C 293,98 300,87 312,81
            C 324,75 337,76 348,84
            C 361,93 370,105 383,108
            C 396,111 406,103 414,94
            C 423,84 430,78 441,80
            C 452,82 459,91 468,101
            C 477,111 488,115 499,110
            C 510,105 514,95 511,84
            C 508,73 498,68 489,72
            C 480,76 478,88 483,98
            C 489,110 504,114 518,109
            C 535,103 548,91 561,82
            C 578,70 595,63 614,62
            C 624,61 632,58 640,53"
            fill="none"
            stroke="#f6f6f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="7 7"/>
    </svg>
  );
}