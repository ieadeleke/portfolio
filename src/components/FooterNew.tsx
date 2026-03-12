import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, cubicBezier } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";

const ease = cubicBezier(0.16, 1, 0.3, 1);

function Badge({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-24 min-w-[140px] rounded-sm border border-[#1a1a1a] bg-[#0e0e0e] px-4">
      <div className="text-center leading-tight">
        <p className="text-[0.85rem] font-extrabold uppercase tracking-[0.08em] text-off-white">
          Clutch
        </p>
        <p className="text-[0.625rem] uppercase tracking-[0.12em] text-[#aaa]">
          {label}
        </p>
        <p className="text-[0.625rem] uppercase tracking-[0.12em] text-[#666]">
          2024
        </p>
      </div>
    </div>
  );
}

export default function FooterNew() {
  const email = "hello@ifeoluwase.dev";

  return (
    <footer className="bg-black">
      <div className="max-w-[1400px] mx-auto px-[clamp(20px,5vw,80px)] pt-[clamp(72px,10vw,120px)] pb-10 relative">
        <div className="grid grid-cols-2">
          <div className="">
            {/* Left — Big CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <h2 className="font-extrabold tracking-[-0.03em] font-outfit text-off-white leading-[1.3] mb-14 text-[clamp(1.2rem,4vw,3.8rem)]">
                Have an idea?
                <br />
                Let's hop on a call.
              </h2>
              <div className="flex items-center gap-6 mt-[clamp(20px,3vw,28px)] flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-off-white text-black px-[22px] py-[14px] text-[0.95rem] font-semibold hover:bg-white transition-colors"
                  aria-label="Start your project"
                >
                  Start your project
                </Link>
                <a
                  href={`mailto:${email}`}
                  className="text-[clamp(0.95rem,1.2vw,1.1rem)] text-[#aaa] hover:text-off-white transition-colors"
                >
                  {email}
                </a>
              </div>

              <div className="mt-[clamp(40px,6vw,64px)] flex gap-6 text-[0.75rem] text-[#777] flex-wrap">
                <a href="#" className="hover:text-off-white transition-colors">
                  X (Twitter)
                </a>
                <a href="#" className="hover:text-off-white transition-colors">
                  Dribbble
                </a>
                <a href="#" className="hover:text-off-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="hover:text-off-white transition-colors">
                  Youtube
                </a>
                <a href="#" className="hover:text-off-white transition-colors">
                  LinkedIn
                </a>
              </div>

              <div className="mt-4">
                <p className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-2">Navigation</p>
                <ul className="flex gap-4 flex-wrap text-[0.75rem] text-[#777]">
                  <li><Link to="/" className="hover:text-off-white transition-colors">Home</Link></li>
                  <li><Link to="/projects" className="hover:text-off-white transition-colors">Projects</Link></li>
                  <li><Link to="/about" className="hover:text-off-white transition-colors">About</Link></li>
                  <li><Link to="/contact" className="hover:text-off-white transition-colors">Contact</Link></li>
                </ul>
              </div>
            </motion.div>
          </div>
          <div className="relative">
            <a
              href={`/contact`}
              aria-label="Talk to an expert"
              className="absolute bottom-6 right-6 w-[108px] h-[108px] rounded-full grid place-items-center"
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
                <text
                  fontSize="8"
                  fill="#888"
                  letterSpacing="2"
                  fontWeight={600}
                >
                  <textPath xlinkHref="#circlePath">
                    • FREE CONSULT • TALK TO AN EXPERT • FREE CONSULT • TALK TO
                    AN EXPERT
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

      {/* Big gradient email band */}
      <div
        className="relative overflow-hidden border-t border-[#1a1a1a]"
        aria-label="Get in touch email banner"
      >
        <div
          className="w-full py-2"
          style={{
            background:
              "linear-gradient(90deg, #ff6a45 0%, #ff493f 45%, #ff3b5c 100%)",
          }}
        ></div>
      </div>
    </footer>
  );
}

function FitEmail({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const measure = () => {
      const c = containerRef.current;
      const t = textRef.current;
      if (!c || !t) return;
      t.style.transform = "scale(1)";
      const cw = c.clientWidth;
      const tw = t.scrollWidth;
      const next = cw > 0 ? Math.min(1, cw / tw) : 1;
      setScale(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <span
        ref={textRef}
        className="inline-block font-extrabold uppercase tracking-[-0.04em] text-black whitespace-nowrap leading-[0.9]"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(3rem,12vw,10rem)",
          transform: `scale(${scale})`,
          transformOrigin: "left center",
        }}
      >
        {text}
      </span>
    </div>
  );
}
