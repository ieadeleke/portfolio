import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, cubicBezier } from 'framer-motion'

const ease = cubicBezier(0.16, 1, 0.3, 1)

const projects = [
  { title: 'Vaultify', category: 'Fintech', type: 'Web Application', year: '2024', imgClass: 'project-img-1' },
  { title: 'Kulture', category: 'E-commerce', type: 'Platform Design', year: '2024', imgClass: 'project-img-2' },
  { title: 'Nomad', category: 'Travel', type: 'Mobile Application', year: '2023', imgClass: 'project-img-3' },
  { title: 'Soundwave', category: 'Entertainment', type: 'Streaming Platform', year: '2023', imgClass: 'project-img-4' },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 20 }
  const panX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), springConfig)
  const panY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.a
      href="#"
      className={`group block ${index % 2 === 1 ? 'lg:mt-[clamp(40px,6vw,100px)]' : ''}`}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, delay: index * 0.15, ease }}
    >
      <div
        ref={ref}
        className="relative overflow-hidden aspect-[3/2]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Curtain wipe */}
        <motion.div
          className="absolute inset-0 bg-black z-[3]"
          initial={{ scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay: 0.3 + index * 0.15, ease }}
          style={{ transformOrigin: 'right' }}
        />

        {/* Image — scaled up 110% so it can pan without showing gaps */}
        <motion.div
          className={`project-img ${project.imgClass} absolute -inset-[5%] w-[110%] h-[110%]`}
          style={{ x: panX, y: panY }}
        >
          <div className={`absolute inset-0 ${project.imgClass}`} />
        </motion.div>

        {/* Hover overlay */}
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
            <span className="text-[0.625rem] font-medium tracking-[0.1em] text-[#555] tabular-nums shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-[clamp(1.25rem,2.2vw,2rem)] font-extrabold tracking-[-0.03em] leading-none uppercase text-off-white transition-colors duration-300 group-hover:text-[#777]">
              {project.title}
            </h3>
          </div>
          <span className="text-[0.6875rem] font-medium tracking-[0.05em] text-[#555] shrink-0 pt-0.5">
            {project.year}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-2.5 ml-[calc(clamp(8px,1vw,14px)+1.1em)]">
          <span className="text-[0.75rem] font-medium tracking-[0.08em] uppercase text-[#555]">
            {project.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#333]" />
          <span className="text-[0.75rem] font-normal text-[#555]">
            {project.type}
          </span>
        </div>
      </div>
    </motion.a>
  )
}

export default function RecentProjects() {
  return (
    <section className="bg-black py-[clamp(60px,8vw,120px)] px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="flex items-end justify-between mb-[clamp(2rem,4vw,3.5rem)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-[#555]">
            Recent Projects
          </p>
          <Link
            to="/projects"
            className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-[#555] border-b border-[#333] pb-1 transition-colors duration-200 hover:text-off-white hover:border-off-white"
          >
            View all &rarr;
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-[clamp(16px,2.5vw,32px)] gap-y-[clamp(32px,5vw,64px)] max-lg:grid-cols-1 max-lg:gap-y-[clamp(40px,6vw,56px)]">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
