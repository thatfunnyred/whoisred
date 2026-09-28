export default function FilterDefs() {
  return (
    <>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="crayon" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves={2}
              seed={7}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={2.2}
              xChannelSelector="R"
              yChannelSelector="G"
              result="wobble"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves={3}
              seed={3}
              result="grain"
            />
            <feColorMatrix
              in="grain"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0"
              result="grainAlpha"
            />
            <feComposite
              in="wobble"
              in2="grainAlpha"
              operator="out"
              result="textured"
            />
            <feMerge>
              <feMergeNode in="textured" />
              <feMergeNode in="wobble" />
            </feMerge>
          </filter>

          <filter id="crayonSoft" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03 0.9"
              numOctaves={2}
              seed={4}
              result="n"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="n"
              scale={6}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter id="crayonRough" x="-10%" y="-60%" width="120%" height="220%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.18 0.35"
              numOctaves={5}
              seed={14}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={55}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="crayonWobble" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03 0.05"
              numOctaves={2}
              seed={6}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={3.5}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
