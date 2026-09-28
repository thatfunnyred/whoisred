import CurvedArrow from "../../../components/svgs/CurvedArrow";
import SwigglyLine from "../../../components/svgs/SwigglyLine";
import TitleScrible from "../../../components/svgs/TitleScrible";
import SendMessageBtn from "../../../components/buttons/SendMessageBtn";
import DeferredTechSphere from "../../../components/tech-sphere/DeferredTechSphere";
import {
  FavoritesNote,
  LegendNote,
  QuickStatsNote,
} from "../../../components/svgs/ToolsNote";

export default function ToolsSection() {
  return (
    <section id="tools-section" className="tools-section">
      <div id="tools-part-1" className="tools-part">
        <h1 id="tools-section-title" className="erica-one-regular">
          WHAT I <br /><span id="tools-text">BUILD WITH.</span>
        </h1>

        <SwigglyLine id="swiggly-line" />

        <h3 id="tools-section-sub-title" className="jersey-25-regular">
          A mix of tools, languages and technologies I use to make things, from games to experiments to weird little toys.
        </h3>

        <LegendNote id="legend-note" />
      </div>

      <div id="tools-part-2" className="tools-part">
        <DeferredTechSphere />
      </div>

      <div id="tools-part-3" className="tools-part">
        <CurvedArrow id="tools-curved-arrow" />
        <h3 id="tools-info-text" className="jersey-25-regular">
          DiFFERENT <br /> TOOLS. <br /> SAME GOAL.
        </h3>

        <QuickStatsNote id="quick-stat-note" />
        <FavoritesNote id="favorite-note" />
        <TitleScrible id="tools-btn-scrible-1" />
        <SendMessageBtn id="tools-send-message-btn" label="LET'S BUILD" />
        <TitleScrible id="tools-btn-scrible-2" />
      </div>
    </section>
  );
}
