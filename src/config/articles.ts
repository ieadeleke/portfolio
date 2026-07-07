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
    title: 'A Beginner’s Guide into Middleware in Express.js and Node.js',
    topic: 'Backend',
    platform: 'Medium',
    date: 'Mar 2023',
    year: '2023',
    readTime: '6 min read',
    url: 'https://medium.com/dev-genius/understanding-and-working-with-middleware-in-express-js-ed19255237b',
    featured: true,
  },
  {
    title: 'Validating form inputs on your Express.js application with express-validator',
    topic: 'Backend',
    platform: 'Medium',
    date: 'Jun 2022',
    year: '2022',
    readTime: '7 min read',
    url: 'https://medium.com/dev-genius/validating-user-inputs-on-your-express-js-application-with-express-validator-4d82b995f524',
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
