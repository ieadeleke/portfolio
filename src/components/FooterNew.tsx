import { motion, cubicBezier } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";
import { site } from "../config/site";
// import footerPattern from "../assets/footer-pattern.svg";

const ease = cubicBezier(0.16, 1, 0.3, 1);

export default function FooterNew() {
  const email = site.contact.email;

  return (
    <footer className="bg-black">
      <div className="max-w-[1400px] mx-auto px-[clamp(20px,5vw,80px)] pt-[clamp(72px,10vw,120px)] pb-10 relative">
        <div className="flex flex-col-reverse md:grid grid-cols-2">
          <div className="">
            {/* Left — Big CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <h2 className="font-extrabold tracking-[-0.03em] font-outfit text-off-white leading-[1.3] mb-14 text-[clamp(2rem,4vw,3.8rem)]">
                Have an idea?
                <br />
                Let's hop on a call.
              </h2>
              <div className="flex items-center gap-6 mt-[clamp(20px,3vw,28px)] flex-wrap">
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center rounded-full bg-off-white text-black px-[22px] py-[14px] text-[0.95rem] font-semibold hover:bg-white transition-colors"
                  aria-label="Start your project — send an email"
                >
                  Start your project
                </a>
                <a
                  href={site.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[clamp(0.95rem,1.2vw,1.1rem)] text-[#aaa] hover:text-off-white transition-colors"
                >
                  {site.contact.phoneDisplay}
                </a>
              </div>

              <div className="mt-[clamp(40px,6vw,64px)] flex gap-6 text-[0.75rem] text-[#777] flex-wrap">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={site.social.x}
                  className="hover:text-off-white transition-colors"
                >
                  X (Twitter)
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={site.social.linkedin}
                  className="hover:text-off-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={site.social.github}
                  className="hover:text-off-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={site.social.medium}
                  className="hover:text-off-white transition-colors"
                >
                  Medium
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={site.social.codesandbox}
                  className="hover:text-off-white transition-colors"
                >
                  CodeSandbox
                </a>
              </div>

              {/* <div className="mt-4">
                <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-2">Navigation</p>
                <ul className="flex gap-4 flex-wrap text-[0.75rem] text-[#777]">
                  <li><Link to="/" className="hover:text-off-white transition-colors">Home</Link></li>
                  <li><Link to="/projects" className="hover:text-off-white transition-colors">Projects</Link></li>
                  <li><Link to="/about" className="hover:text-off-white transition-colors">About</Link></li>
                  <li><Link to="/contact" className="hover:text-off-white transition-colors">Contact</Link></li>
                </ul>
              </div> */}
            </motion.div>
          </div>
          <div className="relative h-32 md:h-auto flex items-end justify-end">
            <a
              href={`mailto:${email}`}
              aria-label="Available for work — send an email"
              className="relative w-[108px] h-[108px] rounded-full grid place-items-center"
            >
              <motion.svg
                viewBox="0 0 100 100"
                className="block w-full h-full text-[#888]"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M50 50 m -36 0 a 36 36 0 1 1 72 0 a 36 36 0 1 1 -72 0"
                  />
                </defs>
                <text fontSize="8" fill="#888" fontWeight={600}>
                  <textPath
                    xlinkHref="#circlePath"
                    textLength="226"
                    lengthAdjust="spacing"
                  >
                    AVAILABLE FOR WORK • AVAILABLE FOR WORK •
                  </textPath>
                </text>
              </motion.svg>
              <div className="absolute inset-0 rounded-full border border-[#1a1a1a]" />
              <div className="absolute inset-[18px] rounded-full bg-[#0e0e0e] border border-[#1a1a1a] grid place-items-center text-off-white">
                <FiMessageCircle className="text-xl" />
              </div>
            </a>
          </div>
        </div>

        {/* Circular CTA — bottom right */}
      </div>

      {/* African pattern accent band */}
      {/* <div className="relative overflow-hidden border-t border-[#1a1a1a]">
        <img
          src={footerPattern}
          alt=""
          aria-hidden="true"
          className="block w-full h-auto select-none"
        />
      </div> */}
    </footer>
  );
}
