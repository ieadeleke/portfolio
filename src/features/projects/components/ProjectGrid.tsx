import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  cubicBezier,
} from "framer-motion";
import ExpandLine from "../../../components/ExpandLine";

const ease = cubicBezier(0.16, 1, 0.3, 1);

const projects = [
  {
    title: "Kariiya",
    category: "Career Platform",
    stack: "Next.js | Express | Python | MongoDB",
    year: "2025",
    link: "https://kariiya.com",
    imgClass: "project-img-1",
  },
  {
    title: "Gaaga",
    category: "Entertainment",
    stack: "React | Tailwind | Framer Motion",
    year: "2026",
    link: "https://gaaga.world",
    imgClass: "project-img-2",
  },
  {
    title: "Madam Shikini",
    category: "AI Chatbot",
    stack: "Next.js | Express | Postgres",
    year: "2024",
    link: "https://madamshikini.lagosstate.gov.ng/",
    imgClass: "project-img-3",
  },
  {
    title: "UsePay4it",
    category: "Fintech",
    stack: "Next.js | Express | Postgres",
    year: "2024",
    link: "https://usepay4it.com",
    imgClass: "project-img-4",
  },
  {
    title: "Bizvantage",
    category: "Business",
    stack: "Next.js | Express | Postgres",
    year: "2026",
    link: "#",
    imgClass: "project-img-5",
  },
  {
    title: "FFWNM",
    category: "Entertainment",
    stack: "Next.js | Tailwind",
    year: "2024",
    link: "https://freestylefridaywithnm.com",
    imgClass: "project-img-6",
  },
  {
    title: "ARM Fitness",
    category: "Fitness",
    stack: "Next.js | Tailwind",
    year: "2024",
    link: "#",
    imgClass: "project-img-7",
  },
  {
    title: "Plangenie",
    category: "Business",
    stack: "Next.js | Express | MongoDB",
    year: "2026",
    link: "https://plangenie.com",
    imgClass: "project-img-8",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };
  const panX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [20, -20]),
    springConfig,
  );
  const panY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [20, -20]),
    springConfig,
  );

  // Scroll-driven parallax — odd cards drift up, even cards drift down
  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    cardScroll,
    [0, 1],
    index % 2 === 0 ? [40, -40] : [80, -80],
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y: parallaxY }}
      className={index % 2 === 1 ? "lg:mt-[clamp(24px,3vw,56px)]" : ""}
    >
      <motion.a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="group block"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, delay: index * 0.1, ease }}
      >
        <div
          ref={ref}
          className="relative overflow-hidden rounded-2xl aspect-[3/2]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Curtain wipe */}
          <motion.div
            className="absolute inset-0 bg-[#DFDFDF] z-[3]"
            initial={{ scaleX: 1 }}
            whileInView={{ scaleX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, delay: 0.2 + index * 0.1, ease }}
            style={{ transformOrigin: "right" }}
          />

          {/* Image — scaled up for pan room */}
          <motion.div
            className={`project-img ${project.imgClass} absolute -inset-[5%] w-[110%] h-[110%]`}
            style={{ x: panX, y: panY }}
          >
            <div className={`absolute inset-0 ${project.imgClass}`} />
          </motion.div>

          {/* Hover overlay (visual only — the whole card is the link) */}
          <div className="absolute inset-0 z-[2] bg-black/0 transition-all duration-500 group-hover:bg-black/30 flex items-end justify-between p-[clamp(16px,2vw,28px)]">
            <span className="text-off-white text-[0.75rem] font-semibold tracking-[0.1em] uppercase opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              View Project
            </span>
            <span className="text-off-white text-[1.25rem] font-light opacity-0 translate-y-4 transition-all duration-500 delay-75 group-hover:opacity-100 group-hover:translate-y-0">
              &rarr;
            </span>
          </div>
        </div>
        <div className="pt-[clamp(12px,1.5vw,20px)]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-baseline gap-[clamp(8px,1vw,14px)]">
              <span className="text-[0.625rem] font-medium tracking-[0.1em] text-gray tabular-nums shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[clamp(1.25rem,2.2vw,2rem)] font-extrabold tracking-[-0.01em] leading-none text-black transition-colors duration-300 group-hover:text-gray-dark">
                {project.title}
              </h3>
            </div>
            <span className="text-[0.6875rem] font-medium tracking-[0.05em] text-gray shrink-0 pt-0.5">
              {project.year}
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-3 mt-2.5 ml-[calc(clamp(8px,1vw,14px)+1.1em)]">
            <span className="text-[0.75rem] font-medium tracking-[0.08em] uppercase text-gray">
              {project.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-light" />
            <span className="text-[0.75rem] font-normal text-gray">
              {project.stack}
            </span>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function ProjectGrid() {
  return (
    <section className="bg-[#DFDFDF] py-[clamp(40px,6vw,80px)] px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-[clamp(2rem,4vw,3.5rem)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
        >
          <ExpandLine className="bg-gray w-12" />
          <p className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-gray">
            Featured Projects
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-[clamp(16px,1.5vw,32px)] gap-y-[clamp(20px,2vw,36px)] max-lg:grid-cols-1 max-lg:gap-y-[clamp(24px,4vw,36px)]">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
