// import { Link } from 'react-router-dom' // restore with the "View all" link when /writing returns
import { motion, cubicBezier } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { featuredArticles, type Article } from '../../../config/articles'

const ease = cubicBezier(0.16, 1, 0.3, 1)

function ArticleRow({ article, index }: { article: Article; index: number }) {
  return (
    <motion.a
      href={article.url}
      target={article.url.startsWith('http') ? '_blank' : undefined}
      rel={article.url.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group flex items-baseline gap-[clamp(16px,2vw,32px)] border-b border-[#1a1a1a] py-[clamp(20px,2.5vw,32px)]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.1, ease }}
    >
      <span className="text-[0.625rem] font-medium tracking-[0.1em] text-[#983520] tabular-nums shrink-0">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="text-[clamp(1.125rem,2vw,1.75rem)] font-extrabold tracking-[-0.01em] leading-tight text-off-white transition-colors duration-300 group-hover:text-[#c9542f]">
          {article.title}
        </h3>
        <div className="flex items-center gap-3 mt-2.5 max-sm:flex-col max-sm:items-start max-sm:gap-1">
          <span className="text-[0.75rem] font-medium tracking-[0.08em] uppercase text-[#555]">
            {article.topic}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#983520] max-sm:hidden" />
          <span className="text-[0.75rem] font-normal text-[#555]">
            {article.platform} &middot; {article.readTime}
          </span>
        </div>
      </div>
      <span className="text-[0.6875rem] font-medium tracking-[0.05em] text-[#555] shrink-0 max-sm:hidden">
        {article.date}
      </span>
      <FiArrowUpRight
        size={20}
        className="text-[#555] shrink-0 transition-all duration-300 group-hover:text-[#c9542f] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </motion.a>
  )
}

export default function Writing() {
  return (
    <section className="bg-black pb-[clamp(60px,8vw,120px)] px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="flex items-end justify-between mb-[clamp(1rem,2vw,2rem)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-[#983520]">
            Technical Writing
          </p>
          {/* hidden until there are more articles — restore alongside the /writing route
          <Link
            to="/writing"
            className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-[#555] border-b border-[#333] pb-1 transition-colors duration-200 hover:text-[#c9542f] hover:border-[#983520]"
          >
            View all &rarr;
          </Link> */}
        </motion.div>

        <div className="border-t border-[#1a1a1a]">
          {featuredArticles.map((article, i) => (
            <ArticleRow key={article.title} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
