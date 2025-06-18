"use client";
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from '@/components/ThemeContext'

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
  const { theme } = useTheme();
  
  return (
    <article className={`border-b pb-6 sm:pb-8 ${
      theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
    }`}>
      <div className={`flex items-center text-sm sm:text-base mb-2 ${
        theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
      }`}>
        <time>{formatDate(article.date)}</time>
        {article.category && (
          <span className={`ml-4 px-2 py-0.5 rounded text-xs sm:text-sm ${
            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
          }`}>{article.category}</span>
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
          className={`transition-colors ${
            theme === 'dark' ? 'hover:text-gray-300' : 'hover:text-gray-600'
          }`}
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
          <div className={`w-6 h-6 rounded-full mr-2 ${
            theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'
          }`}></div>
        )}
        <Link 
          href={`/author/${article.author.toLowerCase().replace(/\s+/g, '-')}`}
          className={`text-sm sm:text-base transition-colors ${
            theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          {article.author}
        </Link>
      </div>
      
      <p className={`text-base sm:text-lg mb-4 leading-relaxed ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {article.description}
      </p>
      
      {article.tags && article.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {article.tags.map(tag => (
            <span key={tag} className={`px-2 py-0.5 rounded text-xs sm:text-sm ${
              theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
            }`}>{tag}</span>
          ))}
        </div>
      )}
      
      <Link 
        href={`/article/${article.slug}`}
        className={`inline-flex items-center text-sm sm:text-base transition-colors group ${
          theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
        }`}
      >
        READ MORE 
        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </article>
  )
}
