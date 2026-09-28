const TECH_SPHERE_STYLES = `
.ts-wrap { position: relative; width: 100%; max-width: 560px; margin-inline: auto; font-family: 'Special Elite', monospace; color: #1c1712; }
.ts-stage { position: relative; width: min(100%, 560px); aspect-ratio: 1/1; margin: 0 auto; touch-action: none; cursor: grab; }
.ts-stage:active { cursor: grabbing; }
.ts-mesh { position: absolute; inset: 0; width: 100%; height: 100%; }
.ts-nodes { position: absolute; inset: 0; }
.ts-node { position: absolute; left: 0; top: 0; display: flex; flex-direction: column; align-items: center;
  gap: 4px; transform: translate(-50%, -50%); pointer-events: auto; }
.ts-badge { width: 42px; height: 42px; display: flex; align-items: center; justify-content: center;
  background: #FBF6EA; color: #1c1712; border: 2.5px solid #1c1712;
  border-radius: 46% 54% 51% 49% / 52% 45% 55% 48%;
  box-shadow: 3px 3px 0 rgba(28,23,18,.85); transition: transform .15s ease, background .15s ease, box-shadow .15s ease; filter: url(#crayon); }
.ts-node:hover .ts-badge { transform: rotate(-6deg) scale(1.14); color: #FBF6EA;
  box-shadow: 4px 4px 0 rgba(28,23,18,.85); }
.ts-label { font-family: 'Special Elite', monospace; font-size: 9px; color: #1c1712; white-space: nowrap;
  background: rgba(251,246,234,.85); padding: 1px 5px; border: 1px solid rgba(28,23,18,.25); border-radius: 3px; }
.ts-tooltip { position: absolute; z-index: 3000; width: 176px; padding: 12px 12px 10px;
  border: 2px solid rgba(28,23,18,.7); box-shadow: 4px 5px 0 rgba(28,23,18,.25); pointer-events: none;
  animation: ts-tooltip-in .2s ease-out both; }
.ts-tooltip .ts-tape { position: absolute; top: -10px; left: 50%; width: 46px; height: 16px;
  background: rgba(230,226,216,.75); border: 1px solid rgba(28,23,18,.2); transform: translateX(-50%) rotate(-3deg); }
.ts-tooltip b { display: block; font-family: 'Kalam', cursive; font-weight: 700; font-size: 15px; margin-bottom: 4px; }
.ts-tooltip p { font-family: 'Kalam', cursive; font-weight: 400; font-size: 12.5px; line-height: 1.4; margin: 0; }
.ts-burst { position: absolute; pointer-events: none; }
@media (max-width: 600px) {
  .ts-stage { width: min(100%, 360px); }
  .ts-node { gap: 3px; }
  .ts-badge { width: 36px; height: 36px; }
  .ts-badge svg { width: 16px; height: 16px; }
  .ts-label { font-size: 8px; padding: 1px 3px; }
  .ts-tooltip { width: min(176px, calc(100vw - 32px)); }
}
@keyframes ts-tooltip-in { from { opacity: 0; translate: 0 8px; } to { opacity: 1; translate: 0 0; } }
`;

export default TECH_SPHERE_STYLES;
