import { motion, cubicBezier, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AsciiImage from "../../../components/AsciiImage";
import mePortrait from "../../../assets/me.png";
import { articles } from "../../../config/articles";

const ease = cubicBezier(0.16, 1, 0.3, 1);

const tagLabels = [
  "Technical Writing",
  `${String(articles.length).padStart(2, "0")} Articles`,
  "Engineering & Design",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={heroRef}>
      <div className="relative w-full min-h-[40rem] bg-black flex flex-col justify-center items-center overflow-hidden">
        {/* Faint ASCII backdrop — same scattered glyph field as Projects */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.28]">
          <AsciiImage src={mePortrait} invert={false} cols={150} className="block w-full" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />

        <motion.h1
          className="text-center z-[1] px-8"
          style={{ y: headingY, opacity: headingOpacity }}
        >
          <span className="block overflow-hidden mb-2">
            <motion.span
              className="block text-[clamp(1rem,3vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] uppercase text-off-white max-sm:text-[clamp(1.375rem,8vw,2.5rem)] max-sm:tracking-[-0.03em]"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.1, ease }}
            >
              Articles on engineering,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[clamp(1rem,3vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] uppercase text-off-white max-sm:text-[clamp(1.375rem,8vw,2.5rem)] max-sm:tracking-[-0.03em]"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.2, ease }}
            >
              design, and building better software.
            </motion.span>
          </span>
        </motion.h1>
      </div>

      <div className="z-[1] grid grid-cols-3 border-t border-[#222] max-lg:grid-cols-2">
        {tagLabels.map((label, i) => (
          <span key={label} className={`block overflow-hidden ${i >= 2 ? 'max-sm:hidden' : ''}`}>
            <motion.span
              className={`block text-[0.6875rem] font-medium tracking-[0.1em] uppercase text-[#555] py-5 px-12 max-lg:py-4 max-lg:px-6 max-sm:py-3.5 max-sm:px-4 max-sm:text-[0.5625rem] ${
                i === 1 ? "text-center max-lg:text-left max-sm:text-right" : ""
              } ${i === 2 ? "text-right max-lg:text-left" : ""}`}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.08, ease }}
            >
              {label}
            </motion.span>
          </span>
        ))}
      </div>
    </section>
  );
}
