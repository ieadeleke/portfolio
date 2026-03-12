import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, cubicBezier } from "framer-motion";

const ease = cubicBezier(0.16, 1, 0.3, 1);

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function FooterUI() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });
  const watermarkScale = useTransform(scrollYProgress, [0.1, 0.4], [0.5, 1]);
  const watermarkOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.35, 0.7, 0.9],
    [0, 0.06, 0.06, 0],
  );

  return (
    <footer
      ref={footerRef}
      className="bg-black relative overflow-hidden"
    >
      <div className="px-[clamp(24px,5vw,80px)] py-[clamp(60px,10vw,120px)]">
        <div>
          <motion.p
            className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            Don&rsquo;t be a stranger
          </motion.p>
        </div>
        <div className="grid grid-cols-3 gap-10">
          <div className="h-100 w-full bg-[#555]"></div>
          <div>
            <motion.p
              className="text-sm tracking-[0.15em] text-[#555] mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              Digital Product Designer with 15+ years of experience in web,
              mobile and mixed reality products. Highly skilled in design
              systems. Familiar with graphic design, motion and branding.
            </motion.p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-7">
                <div>
                  <motion.p
                    className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                  >
                    GitHub
                  </motion.p>
                  <motion.p
                    className="text-sm font-semibold tracking-[0.15em] text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                  >
                    eadelekeife
                  </motion.p>
                </div>
                <div>
                  <motion.p
                    className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                  >
                    GitHub
                  </motion.p>
                  <motion.p
                    className="text-sm font-semibold tracking-[0.15em] text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                  >
                    eadelekeife
                  </motion.p>
                </div>
                <div>
                  <motion.p
                    className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                  >
                    GitHub
                  </motion.p>
                  <motion.p
                    className="text-sm font-semibold tracking-[0.15em] text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                  >
                    eadelekeife
                  </motion.p>
                </div>
                <div>
                  <motion.p
                    className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                  >
                    GitHub
                  </motion.p>
                  <motion.p
                    className="text-sm font-semibold tracking-[0.15em] text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                  >
                    eadelekeife
                  </motion.p>
                </div>
              </div>
              <div className="space-y-7">
                <div>
                  <motion.p
                    className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                  >
                    GitHub
                  </motion.p>
                  <motion.p
                    className="text-sm font-semibold tracking-[0.15em] text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                  >
                    eadelekeife
                  </motion.p>
                </div>
                <div>
                  <motion.p
                    className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-[#555] mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                  >
                    GitHub
                  </motion.p>
                  <motion.p
                    className="text-sm font-semibold tracking-[0.15em] text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                  >
                    eadelekeife
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-[#1a1a1a] px-[clamp(24px,5vw,80px)]">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center py-[clamp(16px,2vw,24px)] max-sm:flex-col max-sm:gap-2">
          <span className="text-[0.5625rem] font-normal tracking-[0.08em] text-[#333]">
            &copy; 2024 Ifeoluwase. All rights reserved.
          </span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[0.5625rem] font-medium tracking-[0.12em] uppercase text-[#333] transition-colors duration-200 hover:text-off-white cursor-pointer"
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
