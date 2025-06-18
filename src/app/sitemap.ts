import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/markdown'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://axialabsresearch.github.io'
  const articles = getAllArticles()
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // Article pages
  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Author pages
  const authorPages = articles.map((article) => ({
    url: `${baseUrl}/author/${article.author.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(article.date),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...articlePages, ...authorPages]
} 