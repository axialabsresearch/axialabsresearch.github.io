// src/app/article/[slug]/page.tsx
import { getArticleBySlug, getAllArticles } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

export default async function ArticlePage({ params }: PageProps) {
  // Await the params before using its properties
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) {
    notFound()
  }

  return (
    <article className="py-6 sm:py-12 max-w-[70rem] mx-auto px-4 sm:px-6">
      <div className="mb-8">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <time>{formatDate(article.date)}</time>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{article.title}</h1>
        <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-6">{article.description}</p>
        
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-gray-600 rounded-full mr-3"></div>
          <Link 
            href={`/author/${article.author.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            {article.author}
          </Link>
        </div>
      </div>
      
      <div 
        className="prose prose-invert prose-sm sm:prose-base md:prose-lg max-w-none overflow-hidden"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      
      <div className="mt-12 pt-8 border-t border-gray-800">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-300 hover:text-white transition-colors group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          Back to articles
        </Link>
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map(article => ({ slug: article.slug }));
}