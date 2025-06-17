"use client";
import { useState } from 'react'
import ArticleCard from './ArticleCard'

export interface Article {
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
  search?: string
  selectedTag?: string
  selectedCategory?: string
}

export default function ArticleList({ articles, search = '', selectedTag = '', selectedCategory = '' }: ArticleListProps) {
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
    <div className="py-12 max-w-[70rem] mx-auto px-4">
      <div className="mb-12">
        <h1 className="text-7xl font-bold mb-4">Axia Labs Research</h1>
        <p className="text-gray-400 text-xl mb-8">
          Blockchain Research and Development Lab.
        </p>
      </div>
      <div className="space-y-14">
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