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
  title: {
    default: 'Axia Labs Research',
    template: '%s | Axia Labs Research'
  },
  description: 'Blockchain Research and Development Lab. Exploring cutting-edge blockchain technology, interoperability protocols, and decentralized systems.',
  keywords: ['blockchain', 'research', 'interoperability', 'cryptography', 'defi', 'web3', 'protocols'],
  authors: [{ name: 'Axia Labs Team' }],
  creator: 'Axia Labs',
  publisher: 'Axia Labs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://axialabsresearch.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://axialabsresearch.github.io',
    title: 'Axia Labs Research',
    description: 'Blockchain Research and Development Lab. Exploring cutting-edge blockchain technology, interoperability protocols, and decentralized systems.',
    siteName: 'Axia Labs Research',
    images: [
      {
        url: '/icon.jpg',
        width: 1200,
        height: 630,
        alt: 'Axia Labs Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axia Labs Research',
    description: 'Blockchain Research and Development Lab. Exploring cutting-edge blockchain technology, interoperability protocols, and decentralized systems.',
    images: ['/icon.jpg'],
    creator: '@_tnxl',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '5aN1DBbveXxXLOK0Q60vRvbNV-6V3oUM8zuHk13EAvg',
  },
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Axia Labs Research",
              "url": "https://axialabsresearch.github.io",
              "logo": "https://axialabsresearch.github.io/icon.jpg",
              "description": "Blockchain Research and Development Lab",
              "sameAs": [
                "https://twitter.com/_tnxl"
              ]
            })
          }}
        />
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
