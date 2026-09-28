import TitleScrible from "../../../components/svgs/TitleScrible";
import Letter from "../../../components/svgs/Letter";
import PaperPlane from "../../../components/svgs/PaperPlane";
import Stamp from "../../../components/svgs/Stamp";
import SendMessageBtn from "../../../components/buttons/SendMessageBtn";

export default function ContactSection() {
  return (
    <section id="contact-section" className="contact-section">
      <TitleScrible id="contact-title-scrible-1" />

      <h1 id="contact-section-title" className="erica-one-regular">
        LET'S BUILD <br /><span id="cta-text">SOMETHING WEIRD.</span>
      </h1>

      <TitleScrible id="contact-title-scrible-2" />

      <h3 id="contact-section-sub-title" className="jersey-25-regular">
        Have an idea, a question, or just want to say hi? <br /> I would love to hear from you.
      </h3>

      <div id="contact-section-separator" />
      <TitleScrible id="contact-letter-scrible-1" />
      <Letter id="contact-letter" />
      <PaperPlane id="contact-paper-plane" />
      <Stamp id="contact-stamp" />
      <TitleScrible id="contact-letter-scrible-2" />
      <SendMessageBtn id="contact-send-message-btn" />
    </section>
  );
}
