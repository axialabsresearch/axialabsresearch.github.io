"use client";
import { useState } from 'react';
import ArticleList from './ArticleList';

interface Article {
  slug: string;
  title: string;
  author: string;
  date: string;
  description: string;
  tags?: string[];
  category?: string;
  image?: string;
}

export default function ArticleListWithSearch({ articles }: { articles: Article[] }) {
  const [search, setSearch] = useState('');
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase()) ||
    article.description.toLowerCase().includes(search.toLowerCase()) ||
    (article.tags && article.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())))
  );
  return (
    <>
      <input
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="form-input px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring w-full md:w-1/2 mb-4"
      />
      <ArticleList articles={filteredArticles} />
    </>
  );
} 