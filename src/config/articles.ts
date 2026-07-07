export type Article = {
  title: string
  topic: string
  platform: string
  date: string
  year: string
  readTime: string
  url: string
  featured?: boolean
}

// Replace these with your real articles
export const articles: Article[] = [
  {
    title: 'Placeholder: Taming Re-renders in Large React Apps',
    topic: 'React Performance',
    platform: 'Medium',
    date: 'Mar 2025',
    year: '2025',
    readTime: '8 min read',
    url: '#',
    featured: true,
  },
  {
    title: 'Placeholder: Designing APIs That Age Well',
    topic: 'Backend Engineering',
    platform: 'Medium',
    date: 'Jan 2025',
    year: '2025',
    readTime: '10 min read',
    url: '#',
    featured: true,
  },
  {
    title: 'Placeholder: Motion Design for Developers',
    topic: 'UI Engineering',
    platform: 'Medium',
    date: 'Nov 2024',
    year: '2024',
    readTime: '6 min read',
    url: '#',
    featured: true,
  },
  {
    title: 'Placeholder: Postgres Indexing, Explained Simply',
    topic: 'Databases',
    platform: 'Medium',
    date: 'Aug 2024',
    year: '2024',
    readTime: '12 min read',
    url: '#',
  },
  {
    title: 'Placeholder: From Figma to Production Without Losing the Design',
    topic: 'Design Systems',
    platform: 'Medium',
    date: 'May 2024',
    year: '2024',
    readTime: '7 min read',
    url: '#',
  },
]

export const featuredArticles = articles.filter((a) => a.featured)
