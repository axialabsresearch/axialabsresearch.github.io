"use client";
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    // On mount, check localStorage or system preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored) {
        setDark(stored === 'dark')
        document.documentElement.classList.toggle('dark', stored === 'dark')
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setDark(prefersDark)
        document.documentElement.classList.toggle('dark', prefersDark)
      }
    }
  }, [])

  const toggleDark = () => {
    setDark(d => {
      const newDark = !d
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark', newDark)
        localStorage.setItem('theme', newDark ? 'dark' : 'light')
      }
      return newDark
    })
  }

  return (
    <header className="border-b border-gray-800 mb-8">
      <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
            <img src="./icon.jpg" alt="Site Icon" className="w-8 h-8" />
          </div>
        </Link>
        <button
          aria-label="Toggle dark mode"
          onClick={toggleDark}
          className="ml-4 p-2 rounded-full bg-gray-800 text-2xl text-gray-200 hover:bg-gray-700 border border-gray-700 transition-colors w-10 h-10 flex items-center justify-center"
        >
          {dark ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}
