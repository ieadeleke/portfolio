import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  cubicBezier,
} from "framer-motion";
import ExpandLine from "../../../components/ExpandLine";
import feImg from "../../../assets/fe.png";
import beImg from "../../../assets/be.png";
import articleImg from "../../../assets/article.png";
import teachImg from "../../../assets/teach.jpeg";

const ease = cubicBezier(0.16, 1, 0.3, 1);

const serviceData = [
  {
    title: "Frontend Development",
    desc: "Building fast, accessible interfaces with modern frameworks and performance-focused architecture.",
    image: feImg,
    accent: "#1a0533",
  },
  {
    title: "Backend & APIs",
    desc: "Designing scalable backend systems, clean APIs, and reliable data layers for modern web applications.",
    image: beImg,
    accent: "#021a12",
  },
  // {
  //   title: "Full-Stack Development",
  //   desc: "Developing complete products end-to-end — from polished interfaces to resilient backend services.",
  //   image: null,
  //   accent: "",
  // },
  {
    title: "Technical Writing",
    desc: "Sharing practical engineering insights through articles that help developers learn and build better systems.",
    image: articleImg,
    accent: "#1a0a00",
  },
  {
    title: "Teaching & Mentorship",
    desc: "Helping developers grow through practical sessions and real-world software engineering guidance.",
    image: teachImg,
    accent: "#020d1a",
  },
];

function ServiceRow({
  service,
  index,
}: {
  service: (typeof serviceData)[0];
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div className="overflow-visible">
      <ExpandLine className="bg-[#222]" delay={index * 0.1} />
      <motion.div
        ref={rowRef}
        className="relative py-[clamp(24px,3.5vw,44px)] flex items-start gap-[clamp(16px,3vw,40px)] max-sm:flex-col max-sm:gap-3 overflow-visible"
        onMouseEnter={(e) => {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
          springX.jump(e.clientX);
          springY.jump(e.clientY);
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, delay: index * 0.1, ease }}
      >
        {/* Floating hover image — fixed to right side, follows cursor Y */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="fixed z-50 w-[300px] pointer-events-none max-lg:hidden"
              style={{
                left: springX,
                top: springY,
                x: "-50%",
                y: "-115%",
                rotate: -3,
              }}
              initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.8, rotate: -6 }}
              transition={{ duration: 0.3, ease }}
            >
              {/* Browser chrome */}
              <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-[#1a1a1a]">
                <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/[0.06]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <div className="flex-1 mx-2 bg-[#2a2a2a] rounded px-2 py-0.5">
                    <p className="text-[0.5rem] text-white/30 tracking-wide truncate">
                      ife.dev/{service.title.toLowerCase().replace(/\s+&?\s*/g, "-")}
                    </p>
                  </div>
                </div>
                <div style={{ backgroundColor: service.accent }} className="p-4">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full block"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <span className="text-[0.625rem] font-medium tracking-[0.1em] text-[#983520] tabular-nums shrink-0 pt-1.5">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex items-start justify-between gap-[clamp(20px,4vw,60px)] w-full max-md:flex-col max-md:gap-3">
          <div className="overflow-hidden shrink-0">
            <motion.h3
              className="text-[clamp(1.25rem,2.2vw,2rem)] font-extrabold tracking-[-0.03em] leading-none uppercase text-off-white"
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.15 + index * 0.1, ease }}
            >
              {service.title}
            </motion.h3>
          </div>
          <motion.p
            className="text-[0.875rem] font-normal leading-[1.7] text-[#666] max-w-[360px]"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.2 + index * 0.1, ease }}
          >
            {service.desc}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  return (
    <section className="bg-black py-[clamp(60px,8vw,120px)] px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-[clamp(2rem,4vw,3.5rem)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
        >
          <ExpandLine className="bg-[#983520] w-12" />
          <p className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-[#983520]">
            What I Do
          </p>
        </motion.div>

        <div>
          {serviceData.map((service, i) => (
            <ServiceRow key={service.title} service={service} index={i} />
          ))}
          <ExpandLine className="bg-[#222]" delay={0.4} />
        </div>
      </div>
    </section>
  );
}
