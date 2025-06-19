import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/markdown'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://axialabsresearch.github.io'
  const articles = getAllArticles()
  
  const currentDate = new Date().toISOString()
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // Article pages
  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: new Date(article.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Author pages
  const authorPages = articles.map((article) => ({
    url: `${baseUrl}/author/${article.author.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(article.date).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Deduplicate author pages by URL
  const uniqueAuthorPages = Array.from(
    new Map(authorPages.map(page => [page.url, page])).values()
  )

  return [...staticPages, ...articlePages, ...uniqueAuthorPages]
} 