import { useRef } from "react";
import { motion, useScroll, useTransform, cubicBezier } from "framer-motion";
import ExpandLine from "../../../components/ExpandLine";
import RevealWords from "../../../components/RevealWords";
import { ImageSpotlight } from "./ImageSpotlight";
import ifeImg from "../../../assets/me.webp";
import { Link } from "react-router-dom";

const ease = cubicBezier(0.16, 1, 0.3, 1);

export default function Editorial() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.15, 1, 1.05],
  );

  return (
    <section className="py-[clamp(60px,8vw,120px)] px-[clamp(24px,5vw,80px)] bg-[#DFDFDF]">
      <div className="grid grid-cols-2 gap-[clamp(40px,6vw,120px)] max-w-[1400px] mx-auto items-start max-lg:grid-cols-1">
        <div className="pt-4">
          <motion.div
            className="flex items-center gap-4 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            <ExpandLine className="bg-gray w-12" />
            <p className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-gray">
              Hello there
            </p>
          </motion.div>

          {/* Text line reveal */}
          <div className="text-[clamp(1.375rem,2.5vw,2.125rem)] font-semibold leading-[1.35] tracking-[-0.02em] text-black mb-8">
            <RevealWords
              text="I’m Ifeoluwase, a full-stack developer who designs and builds fast, accessible web products from polished interfaces to resilient backends."
              delay={0}
              stagger={0.035}
            />
          </div>

          <motion.p
            className="text-[0.9375rem] font-normal leading-[1.8] text-gray-dark max-w-[500px] mb-10"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.5, ease }}
          >
            I start by understanding the problem, outcomes, and constraints,
            then deliver in short, agile iterations - shipping early and
            refining through feedback. I build clean interfaces and reliable
            APIs with performance and maintainability in mind, and I share what
            I learn through technical writing and teaching.
          </motion.p>
          <motion.p
            className="text-[0.9375rem] font-normal leading-[1.8] text-gray-dark max-w-[500px]"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.5, ease }}
          >
            <Link to="/contact" className="underline underline-offset-4">
              Let's work together
            </Link>
          </motion.p>
        </div>

        {/* Image — curtain wipe reveal + scroll parallax */}
        <div
          ref={imageRef}
          className="relative w-full h-170 overflow-hidden max-lg:aspect-16/10 max-lg:order-first max-lg:h-auto"
        >
          <motion.div
            className="absolute inset-0 bg-[#DFDFDF] z-10"
            initial={{ y: "0%" }}
            whileInView={{ y: "-101%" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
          />
          <ImageSpotlight
            src={ifeImg}
            colorSrc={ifeImg}
            alt="Ifeoluwase portrait"
          />
        </div>
      </div>
    </section>
  );
}
