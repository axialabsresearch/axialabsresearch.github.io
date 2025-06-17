import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import 'katex/dist/katex.min.css'
import { ThemeProvider } from '../components/ThemeContext'
import React from 'react'

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
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider>
          {/* <Header /> Removed to avoid duplicate header */}
          <main className="max-w-[250rem] mx-auto px-6">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
