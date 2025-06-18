import Link from 'next/link'
import Image from 'next/image'

// Define formatDate directly in this component
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

interface Article {
  slug: string
  title: string
  author: string
  date: string
  description: string
  tags?: string[]  // Make optional
  category?: string  // Make optional
  image?: string
}

interface ArticleCardProps {
  article: Article
  authorAvatar?: string
}

export default function ArticleCard({ article, authorAvatar }: ArticleCardProps) {
  
  return (
    <article className="border-b border-gray-800 pb-6 sm:pb-8">
      <div className="flex items-center text-sm sm:text-base text-gray-500 mb-2">
        <time>{formatDate(article.date)}</time>
        {article.category && (
          <span className="ml-4 px-2 py-0.5 rounded bg-gray-700 text-xs sm:text-sm text-gray-300">{article.category}</span>
        )}
      </div>
      {article.image && (
        <Image 
          src={article.image} 
          alt={article.title} 
          width={800} 
          height={400} 
          className="w-full h-48 object-cover rounded mb-4" 
        />
      )}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
        <Link 
          href={`/article/${article.slug}`}
          className="hover:text-gray-300 transition-colors"
        >
          {article.title}
        </Link>
      </h2>
      
      <div className="flex items-center mb-4">
        {authorAvatar ? (
          <Image 
            src={authorAvatar} 
            alt={article.author} 
            width={24} 
            height={24} 
            className="w-6 h-6 rounded-full object-cover mr-2" 
          />
        ) : (
          <div className="w-6 h-6 bg-gray-600 rounded-full mr-2"></div>
        )}
        <Link 
          href={`/author/${article.author.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
        >
          {article.author}
        </Link>
      </div>
      
      <p className="text-gray-300 text-base sm:text-lg mb-4 leading-relaxed">
        {article.description}
      </p>
      
      {article.tags && article.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {article.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded bg-gray-800 text-xs sm:text-sm text-gray-400">{tag}</span>
          ))}
        </div>
      )}
      
      <Link 
        href={`/article/${article.slug}`}
        className="inline-flex items-center text-sm sm:text-base text-gray-300 hover:text-white transition-colors group"
      >
        READ MORE 
        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </article>
  )
}
