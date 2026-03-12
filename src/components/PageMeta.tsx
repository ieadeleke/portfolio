import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../config/site'

export default function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': site.baseTitle,
      '/about': site.titleTemplate.replace('%s', 'About'),
      '/projects': site.titleTemplate.replace('%s', 'Projects'),
      '/contact': site.titleTemplate.replace('%s', 'Contact'),
    }
    const descriptions: Record<string, string> = {
      '/': site.description,
      '/about': 'Learn about my approach, services, and a few fun facts.',
      '/projects': 'Selected work across web, mobile, and product design.',
      '/contact': 'Get in touch to start your next project.'
    }

    const title = titles[pathname] ?? site.baseTitle
    const desc = descriptions[pathname] ?? site.description

    if (document.title !== title) document.title = title
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (meta) {
      if (meta.content !== desc) meta.content = desc
    } else {
      const m = document.createElement('meta')
      m.setAttribute('name', 'description')
      m.setAttribute('content', desc)
      document.head.appendChild(m)
    }
  }, [pathname])

  return null
}

