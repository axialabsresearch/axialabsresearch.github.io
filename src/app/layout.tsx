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
    default: 'Axia Labs Research - Blockchain Research and Development',
    template: '%s | Axia Labs Research'
  },
  description: 'Axia Labs Research is a blockchain research and development lab exploring cutting-edge blockchain technology, interoperability protocols, and decentralized systems.',
  keywords: ['blockchain research', 'blockchain development', 'interoperability', 'cryptography', 'defi', 'web3', 'protocols', 'axia labs'],
  authors: [{ name: 'Axia Labs Research Team' }],
  creator: 'Axia Labs Research',
  publisher: 'Axia Labs Research',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://axialabsresearch.github.io'),
  alternates: {
    canonical: 'https://axialabsresearch.github.io',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://axialabsresearch.github.io',
    title: 'Axia Labs Research - Blockchain Research and Development',
    description: 'Axia Labs Research is a blockchain research and development lab exploring cutting-edge blockchain technology, interoperability protocols, and decentralized systems.',
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
    title: 'Axia Labs Research - Blockchain Research and Development',
    description: 'Axia Labs Research is a blockchain research and development lab exploring cutting-edge blockchain technology, interoperability protocols, and decentralized systems.',
    images: ['/icon.jpg'],
    creator: '@_tnxl',
    site: '@_tnxl',
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
    google: 'BfQ7ZlFVrCtP2qgOlwdYk_H0coaj9qL9UkNSeytWPxc',
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
        <meta name="google-site-verification" content="BfQ7ZlFVrCtP2qgOlwdYk_H0coaj9qL9UkNSeytWPxc" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ResearchOrganization",
              "name": "Axia Labs Research",
              "url": "https://axialabsresearch.github.io",
              "logo": "https://axialabsresearch.github.io/icon.jpg",
              "description": "Blockchain Research and Development Lab exploring cutting-edge blockchain technology and interoperability protocols",
              "sameAs": [
                "https://twitter.com/_tnxl"
              ],
              "knowsAbout": [
                "Blockchain Technology",
                "Cryptography",
                "Interoperability Protocols",
                "Decentralized Systems",
                "Web3"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider>
          <SearchModalProvider articles={articles}>
            <main className="flex-1 max-w-[70rem] mx-auto px-6">
              {children}
            </main>
          </SearchModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
