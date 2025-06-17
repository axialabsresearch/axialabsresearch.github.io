"use client";
import React, { useState, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import ArticleList, { Article } from './ArticleList';
import { usePathname } from 'next/navigation';

// Dummy data for tags and categories (replace with real data as needed)
const tags = ["All Tags", "Blockchain", "AI", "Security"];
const categories = ["All Categories", "Research", "Development", "Tutorial"];

export default function SearchModalProvider({ children, articles }: { children: React.ReactNode, articles?: Article[] }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  React.useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setModalOpen(false);
    }
  };

  return (
    <>
      <Header onOpenFilterModal={() => setModalOpen(true)} />
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-12 bg-black bg-opacity-50 backdrop-blur-md transition-opacity duration-300">
          <div className="relative bg-black rounded-2xl shadow-2xl w-full max-w-2xl p-0 overflow-hidden transition-all duration-300">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl z-10"
              onClick={() => setModalOpen(false)}
              aria-label="Close filter modal"
            >
              &times;
            </button>
            <div className="flex items-center px-6 pt-6 pb-2 bg-black rounded-t-2xl">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                className="flex-1 bg-transparent outline-none text-white text-lg placeholder-gray-400"
                style={{ border: 'none' }}
              />
            </div>
            <div className="flex items-center gap-2 px-6 py-2 bg-[#181c23] text-gray-400 text-sm rounded-b-2xl border-t border-gray-800">
              <span>Type</span>
              <kbd className="bg-gray-800 px-2 py-1 rounded text-xs">#</kbd>
              <span>for tags,</span>
              <kbd className="bg-gray-800 px-2 py-1 rounded text-xs">@</kbd>
              <span>for authors,</span>
              <kbd className="bg-gray-800 px-2 py-1 rounded text-xs">&gt;</kbd>
              <span>for posts, and</span>
              <kbd className="bg-gray-800 px-2 py-1 rounded text-xs">/</kbd>
              <span>for pages.</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 px-6 py-6 bg-black">
              <select
                value={selectedTag}
                onChange={e => setSelectedTag(e.target.value)}
                className="flex-1 bg-gray-900 text-white text-lg px-4 py-3 rounded-lg border-none outline-none appearance-none shadow focus:ring-2 focus:ring-gray-700 transition-all duration-200"
              >
                {tags.map(tag => (
                  <option
                    key={tag}
                    value={tag === 'All Tags' ? '' : tag}
                    className="bg-gray-900 text-white"
                  >
                    {tag}
                  </option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="flex-1 bg-gray-900 text-white text-lg px-4 py-3 rounded-lg border-none outline-none appearance-none shadow focus:ring-2 focus:ring-gray-700 transition-all duration-200"
              >
                {categories.map(cat => (
                  <option
                    key={cat}
                    value={cat === 'All Categories' ? '' : cat}
                    className="bg-gray-900 text-white"
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
      <main className="flex-1 max-w-[250rem] mx-auto px-6">
        {isHome && articles ? (
          <ArticleList
            articles={articles}
            search={search}
            selectedTag={selectedTag}
            selectedCategory={selectedCategory}
          />
        ) : (
          children
        )}
      </main>
      <Footer />
    </>
  );
} 