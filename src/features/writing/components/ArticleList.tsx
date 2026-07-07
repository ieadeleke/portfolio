import { motion, cubicBezier } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import ExpandLine from '../../../components/ExpandLine'
import { articles, type Article } from '../../../config/articles'

const ease = cubicBezier(0.16, 1, 0.3, 1)

function ArticleRow({ article, index }: { article: Article; index: number }) {
  return (
    <motion.a
      href={article.url}
      target={article.url.startsWith('http') ? '_blank' : undefined}
      rel={article.url.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group flex items-baseline gap-[clamp(16px,2vw,32px)] border-b border-gray-light py-[clamp(24px,3vw,40px)]"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, delay: (index % 4) * 0.08, ease }}
    >
      <span className="text-[0.625rem] font-medium tracking-[0.1em] text-gray tabular-nums shrink-0">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="text-[clamp(1.25rem,2.4vw,2.25rem)] font-extrabold tracking-[-0.01em] leading-tight text-black transition-colors duration-300 group-hover:text-gray-dark">
          {article.title}
        </h3>
        <div className="flex items-center gap-3 mt-2.5 max-sm:flex-col max-sm:items-start max-sm:gap-1">
          <span className="text-[0.75rem] font-medium tracking-[0.08em] uppercase text-gray">
            {article.topic}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-light max-sm:hidden" />
          <span className="text-[0.75rem] font-normal text-gray">
            {article.platform} &middot; {article.readTime}
          </span>
        </div>
      </div>
      <span className="text-[0.6875rem] font-medium tracking-[0.05em] text-gray shrink-0 max-sm:hidden">
        {article.date}
      </span>
      <FiArrowUpRight
        size={22}
        className="text-gray shrink-0 transition-all duration-300 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </motion.a>
  )
}

export default function ArticleList() {
  return (
    <section className="bg-[#DFDFDF] py-[clamp(40px,6vw,80px)] px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-[clamp(1.5rem,3vw,2.5rem)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
        >
          <ExpandLine className="bg-gray w-12" />
          <p className="text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-gray">
            All Articles
          </p>
        </motion.div>

        <div className="border-t border-gray-light">
          {articles.map((article, i) => (
            <ArticleRow key={article.title} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
