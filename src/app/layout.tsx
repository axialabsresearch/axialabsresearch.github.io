import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'katex/dist/katex.min.css'
import { ThemeProvider } from '../components/ThemeContext'
import React from 'react'
import SearchModalProvider from '../components/SearchModalProvider'
import { getAllArticles } from '@/lib/markdown'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Axia Labs Research',
  description: 'Blockchain Research and Development Lab.',
} 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const articles = getAllArticles();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.jpg" type="image/jpg" />
        <link rel="apple-touch-icon" href="/icon.jpg" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider>
          <SearchModalProvider articles={articles}>
            <main className="flex-1 max-w-[250rem] mx-auto px-6">
              {children}
            </main>
          </SearchModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
