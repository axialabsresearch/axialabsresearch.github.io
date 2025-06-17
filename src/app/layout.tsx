import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Axial Labs Research',
  description: 'Blockchain Research and Development Lab.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-gray-900 dark:bg-black dark:text-gray-100 min-h-screen`}>
        <Header />
        <main className="max-w-4xl mx-auto px-6">
          {children}
        </main>
      </body>
    </html>
  )
}
