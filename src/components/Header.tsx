"use client";
import { useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeContext'
import React from 'react'
import Image from 'next/image'

export default function Header({ onOpenFilterModal }: { onOpenFilterModal?: () => void }) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Apply theme to HTML element
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  const iconSrc = theme === 'dark' ? '/icon.jpg' : '/icon-dark.jpg';

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md mb-8 ${theme === 'dark' ? 'bg-black/80' : 'bg-white/80 border-b border-gray-200'}`}>
      {/* <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between"> */}
      <div className="max-w-[70rem] mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
        <div className="w-12 h-12 flex items-center justify-center">
            <Image 
              src={iconSrc} 
              alt="Site Icon" 
              width={32} 
              height={32} 
              className="w-8 h-8" 
            />
          </div>
        </Link>
        <div className="flex items-center space-x-2">
          <button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className={`p-2 rounded w-10 h-10 flex items-center justify-center transition-colors ${
              theme === 'dark' 
                ? 'text-gray-200 hover:text-white' 
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.41-1.41M6.05 6.05L4.64 4.64m12.02 0l-1.41 1.41M6.05 17.95l-1.41 1.41" />
              </svg>
            )}
          </button>
          {onOpenFilterModal && (
            <button
              aria-label="Open filter modal"
              onClick={onOpenFilterModal}
              className={`p-2 rounded w-10 h-10 flex items-center justify-center transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-200 hover:text-white' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
