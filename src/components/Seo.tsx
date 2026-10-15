import { useLayoutEffect } from 'react'

type SeoProps = {
  title: string
  description?: string
  canonical?: string
  ogType?: string
  ogImage?: string | null
}

const upsertMeta = (
  attr: 'name' | 'property',
  key: string,
  content: string,
) => {
  const selector = `meta[${attr}="${key}"]`
  const existing = [
    ...document.head.querySelectorAll<HTMLMetaElement>(selector),
  ]
  const el = existing[0] ?? document.createElement('meta')
  if (!existing[0]) {
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  existing.slice(1).forEach((node) => node.remove())
}

const removeMeta = (attr: 'name' | 'property', key: string) => {
  document.head
    .querySelectorAll(`meta[${attr}="${key}"]`)
    .forEach((node) => node.remove())
}

const upsertCanonical = (href: string) => {
  const existing = [
    ...document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'),
  ]
  const el = existing[0] ?? document.createElement('link')
  if (!existing[0]) {
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  existing.slice(1).forEach((node) => node.remove())
}

const removeCanonical = () => {
  document.head
    .querySelectorAll('link[rel="canonical"]')
    .forEach((node) => node.remove())
}

export const Seo = ({
  title,
  description,
  canonical,
  ogType,
  ogImage,
}: SeoProps) => {
  useLayoutEffect(() => {
    document.title = title

    if (description) {
      upsertMeta('name', 'description', description)
      upsertMeta('property', 'og:description', description)
    } else {
      removeMeta('name', 'description')
      removeMeta('property', 'og:description')
    }

    upsertMeta('property', 'og:title', title)
    upsertMeta('name', 'twitter:card', 'summary_large_image')

    if (ogType) upsertMeta('property', 'og:type', ogType)
    else removeMeta('property', 'og:type')

    if (ogImage) upsertMeta('property', 'og:image', ogImage)
    else removeMeta('property', 'og:image')

    if (canonical) {
      upsertMeta('property', 'og:url', canonical)
      upsertCanonical(canonical)
    } else {
      removeMeta('property', 'og:url')
      removeCanonical()
    }
  }, [title, description, canonical, ogType, ogImage])

  return null
}
