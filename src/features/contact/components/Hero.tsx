import { motion, cubicBezier } from "framer-motion";
import { site } from "../../../config/site";

const ease = cubicBezier(0.16, 1, 0.3, 1);

const tagLabels = [
  site.contact.email,
  site.contact.location,
  "Available for Work",
];

export default function Hero() {
  return (
    <section>
      <div className="relative w-full min-h-[40rem] bg-black flex flex-col justify-center items-center overflow-hidden">
        <h1 className="text-center z-[1] px-8">
          <span className="block overflow-hidden mb-2">
            <motion.span
              className="block text-[clamp(1rem,3vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] uppercase text-off-white max-sm:text-[clamp(1.75rem,10vw,3rem)] max-sm:tracking-[-0.03em]"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.1, ease }}
            >
              Have a project in mind?
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[clamp(1rem,3vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] uppercase text-off-white max-sm:text-[clamp(1.75rem,10vw,3rem)] max-sm:tracking-[-0.03em]"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.2, ease }}
            >
              Let’s build something great together.
            </motion.span>
          </span>
        </h1>
      </div>
      <div className="z-[1] grid grid-cols-3 border-t border-[#222] max-lg:grid-cols-1">
        {tagLabels.map((label, i) => (
          <span key={label} className="block overflow-hidden">
            <motion.span
              className={`block text-[0.6875rem] font-medium tracking-[0.1em] uppercase text-[#555] py-5 px-12 max-lg:py-4 max-lg:px-6 max-sm:py-3.5 max-sm:px-4 max-sm:text-[0.5625rem] ${
                i === 1 ? "text-center max-lg:text-left" : ""
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
