import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../config/site'

function setMeta(selector: string, attr: string, create: () => HTMLElement, content: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  if (el.getAttribute(attr) !== content) el.setAttribute(attr, content)
}

export default function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': site.baseTitle,
      '/about': site.titleTemplate.replace('%s', 'About'),
      '/projects': site.titleTemplate.replace('%s', 'Projects'),
      '/writing': site.titleTemplate.replace('%s', 'Writing'),
      '/contact': site.titleTemplate.replace('%s', 'Contact'),
    }
    const descriptions: Record<string, string> = {
      '/': site.description,
      '/about': 'Learn about my approach, services, and a few fun facts.',
      '/projects': 'Selected work across web, mobile, and product design.',
      '/writing': 'Technical articles on engineering, design, and building better software.',
      '/contact': 'Get in touch to start your next project.'
    }

    const title = titles[pathname] ?? site.baseTitle
    const desc = descriptions[pathname] ?? site.description
    const url = `${site.url}${pathname === '/' ? '/' : pathname}`

    if (document.title !== title) document.title = title

    const meta = (name: string) => () => {
      const m = document.createElement('meta')
      m.setAttribute('name', name)
      return m
    }
    const og = (property: string) => () => {
      const m = document.createElement('meta')
      m.setAttribute('property', property)
      return m
    }

    setMeta('meta[name="description"]', 'content', meta('description'), desc)
    setMeta('meta[property="og:title"]', 'content', og('og:title'), title)
    setMeta('meta[property="og:description"]', 'content', og('og:description'), desc)
    setMeta('meta[property="og:url"]', 'content', og('og:url'), url)
    setMeta('meta[name="twitter:title"]', 'content', meta('twitter:title'), title)
    setMeta('meta[name="twitter:description"]', 'content', meta('twitter:description'), desc)
    setMeta('link[rel="canonical"]', 'href', () => {
      const l = document.createElement('link')
      l.setAttribute('rel', 'canonical')
      return l
    }, url)
  }, [pathname])

  return null
}
