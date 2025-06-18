// src/app/article/[slug]/page.tsx
import { getArticleBySlug, getAllArticles } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ArticleContent from '../../../components/ArticleContent'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    }
  }

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      images: ['/icon.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: ['/icon.jpg'],
    },
    alternates: {
      canonical: `/article/${slug}`,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  // Await the params before using its properties
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) {
    notFound()
  }

  return (
    <ArticleContent article={article} slug={slug} />
  )
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map(article => ({ slug: article.slug }));
}