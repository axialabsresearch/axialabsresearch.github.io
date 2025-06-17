"use client";
import { useState } from 'react'
import ArticleCard from './ArticleCard'

interface Article {
  slug: string
  title: string
  author: string
  date: string
  description: string
  tags?: string[]
  category?: string
  image?: string
}

interface ArticleListProps {
  articles: Article[]
}

export default function ArticleList({ articles }: ArticleListProps) {
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Collect all unique tags and categories
  const tags = Array.from(new Set(articles.flatMap((a: Article) => a.tags || [])))
  const categories = Array.from(new Set(articles.map((a: Article) => a.category).filter(Boolean))) as string[]

  // Filter articles by search, tag, and category
  const filtered = articles.filter((article: Article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase()) ||
      (article.tags && article.tags.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase())))
    const matchesTag = selectedTag ? article.tags && article.tags.includes(selectedTag) : true
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true
    return matchesSearch && matchesTag && matchesCategory
  })

  return (
    <div className="py-12 max-w-4xl mx-auto px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Axial Labs Research</h1>
        <p className="text-gray-400 text-lg mb-8">
          Blockchain Research and Development Lab.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring w-full md:w-1/2"
          />
          <select
            value={selectedTag}
            onChange={e => setSelectedTag(e.target.value)}
            className="form-select px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none w-full md:w-1/4"
          >
            <option value="">All Tags</option>
            {tags.map((tag: string) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="form-select px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none w-full md:w-1/4"
          >
            <option value="">All Categories</option>
            {categories.map((cat: string) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-12">
        {filtered.map((article: Article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
        {filtered.length === 0 && (
          <div className="text-gray-400">No articles found.</div>
        )}
      </div>
    </div>
  )
}