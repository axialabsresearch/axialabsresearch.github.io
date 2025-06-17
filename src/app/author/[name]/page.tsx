// src/app/author/[name]/page.tsx
import { getAllArticles } from '@/lib/markdown'
import ArticleCard from '@/components/ArticleCard'
import { notFound } from 'next/navigation'

interface AuthorPageProps {
  params: Promise<{ name: string }>
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  // Await the params before using its properties
  const { name } = await params
  
  // Replace ALL dashes with spaces and properly capitalize
  const authorName = name.replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  const articles = getAllArticles()
  
  const authorArticles = articles.filter(
    article => article.author.toLowerCase() === authorName.toLowerCase()
  )

  if (authorArticles.length === 0) {
    notFound()
  }

  return (
    <div className="py-12 max-w-4xl mx-auto px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Articles by {authorName}
        </h1>
        <p className="text-gray-400 text-lg">
          {authorArticles.length} article{authorArticles.length !== 1 ? 's' : ''} published
        </p>
      </div>
      
      <div className="space-y-12">
        {authorArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}