// src/app/author/[name]/not-found.tsx
import Link from 'next/link'

export default function AuthorNotFound() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Author Not Found</h1>
      <p className="text-gray-400 text-lg mb-8">
        The author you&apos;re looking for doesn&apos;t exist or has no published articles.
      </p>
      <Link 
        href="/"
        className="inline-flex items-center text-gray-300 hover:text-white transition-colors group"
      >
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
        Back to articles
      </Link>
    </div>
  )
}
