import { Link } from "react-router-dom";
import { motion, cubicBezier } from "framer-motion";
import ExpandLine from "../../../components/ExpandLine";
import RevealWords from "../../../components/RevealWords";
import { site } from "../../../config/site";
import meImg from "../../../assets/me.png";

const ease = cubicBezier(0.16, 1, 0.3, 1);

export default function Bio() {
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
              About Me
            </p>
          </motion.div>

          <div className="text-[clamp(1.375rem,2.5vw,2.125rem)] font-semibold leading-[1.35] tracking-[-0.02em] text-black mb-8">
            <RevealWords
              text="I'm Ifeoluwase — a fullstack developer who builds digital products at the intersection of clean design and solid engineering. I also write technical articles and teach."
              stagger={0.035}
            />
          </div>

          <motion.p
            className="text-[0.9375rem] font-normal leading-[1.8] text-gray-dark max-w-[440px] mb-10"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.4, ease }}
          >
            Based in Lagos, I work with startups and teams worldwide to turn
            ideas into polished, high-performance products. I care deeply about
            the details — from pixel-perfect interfaces to well-architected
            systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          >
            <Link to="/about" className="group inline-flex items-center gap-3">
              <span className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-black border-b border-black pb-1 transition-colors duration-200 group-hover:text-gray-dark group-hover:border-gray-dark">
                More about me
              </span>
              <span className="text-black text-lg transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </Link>
            <div className="h-3" />
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3"
            >
              <span className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-black border-b border-black pb-1 transition-colors duration-200 group-hover:text-gray-dark group-hover:border-gray-dark">
                Download resume
              </span>
              <span className="text-black text-lg transition-transform duration-300 group-hover:translate-x-1.5">
                ↗
              </span>
            </a>
          </motion.div>
        </div>

        {/* Project collage — curtain wipe */}
        <div className="relative w-full h-170 overflow-hidden max-lg:aspect-[16/10] max-lg:h-auto max-lg:order-first">
          <motion.div
            className="absolute inset-0 bg-[#DFDFDF] z-10"
            initial={{ x: "0%" }}
            whileInView={{ x: "101%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
          />
          <motion.div
            className="absolute inset-0 bg-[#0f0f0f]"
            initial={{ scale: 1.4 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.6, delay: 0.2, ease }}
          >
            <img
              src={meImg}
              alt="Ifeoluwase"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
