import { useRef } from "react";
import { motion, useScroll, useTransform, cubicBezier } from "framer-motion";
import AsciiImage from "../../../components/AsciiImage";
import mePortrait from "../../../assets/me.webp";

const ease = cubicBezier(0.16, 1, 0.3, 1);

const tagLabels = [
  "Full-Stack Developer",
  "Design-Forward",
  "Detail-Obsessed",
  "Based in Lagos",
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
      <div className="relative w-full min-h-[30rem] md:min-h-[40rem] bg-black flex flex-col justify-center items-center overflow-hidden">
        {/* ASCII portrait backdrop */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.28]">
          <AsciiImage src={mePortrait} invert={false} cols={150} className="block w-full" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
        {/* <div className="absolute top-10 left-12 right-12 flex justify-between z-[1] max-lg:top-6 max-lg:left-6 max-lg:right-6">
          <motion.span
            className="text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-[#555]"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            ESTD. 2024
          </motion.span>
          <motion.span
            className="text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-[#555]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            ABOUT
          </motion.span>
        </div> */}

        {/* Text line reveal — parallax on scroll */}
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
              Building clean interfaces
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[clamp(1rem,3vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] uppercase text-off-white max-sm:text-[clamp(1.375rem,8vw,2.5rem)] max-sm:tracking-[-0.03em]"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.2, ease }}
            >
              and resilient systems for the web.
            </motion.span>
          </span>
        </motion.h1>
      </div>

      {/* Infinite marquee ticker */}
      {/* <div className="relative z-[1] border-t border-[#222] overflow-hidden bg-black">
        <motion.div
          className="flex whitespace-nowrap py-[clamp(14px,2vw,20px)]"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        >
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0 items-center">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="flex items-center">
                  <span className="text-[clamp(0.875rem,1.5vw,1.125rem)] font-bold tracking-[0.2em] uppercase text-off-white mx-[clamp(20px,3vw,40px)]">
                    Crafting Digital Experiences
                  </span>
                  <span className="text-[0.5rem] text-[#555]">&#10038;</span>
                  <span className="text-[clamp(0.875rem,1.5vw,1.125rem)] font-bold tracking-[0.2em] uppercase text-off-white mx-[clamp(20px,3vw,40px)]">
                    Design &times; Development
                  </span>
                  <span className="text-[0.5rem] text-[#555]">&#10038;</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div> */}

      <div className="z-[1] grid grid-cols-4 border-t border-[#222] max-lg:grid-cols-2">
        {tagLabels.map((label, i) => (
          <span key={label} className={`block overflow-hidden ${i >= 2 ? 'max-sm:hidden' : ''}`}>
            <motion.span
              className={`block text-[0.6875rem] font-medium tracking-[0.1em] uppercase text-[#555] py-5 px-12 max-lg:py-4 max-lg:px-6 max-sm:py-3.5 max-sm:px-4 max-sm:text-[0.5625rem] ${
                i === 1 ? "max-lg:border-r-0 max-lg:text-right" : ""
              } ${i === 2 || i === 3 ? "max-lg:border-t" : ""} ${i === 3 ? "border-[#222] text-right" : ""}`}
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
