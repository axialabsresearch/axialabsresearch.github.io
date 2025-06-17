// src/app/author/[name]/page.tsx
import { getAllArticles } from '@/lib/markdown'
import ArticleCard from '@/components/ArticleCard'
import { notFound } from 'next/navigation'
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image';

interface AuthorPageProps {
  params: Promise<{ name: string }>
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  // Await the params before using its properties
  const { name } = await params
  const authorSlug = name.toLowerCase();
  const authorFile = path.join(process.cwd(), 'author', `${authorSlug}.md`);
  let authorProfile = null;
  let authorContent = '';

  try {
    const fileContent = await fs.readFile(authorFile, 'utf8');
    const { data, content } = matter(fileContent);
    authorProfile = data;
    authorContent = content;
  } catch (e) {
    authorProfile = { name: authorSlug.replace(/-/g, ' ') };
  }

  // Replace ALL dashes with spaces and properly capitalize
  const authorName = authorProfile.name || authorSlug.replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const articles = getAllArticles()
  // Helper to slugify author names for robust matching
  function slugify(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  const authorArticles = articles.filter(
    article => slugify(article.author) === slugify(authorSlug)
  )

  if (authorArticles.length === 0) {
    notFound()
  }

  return (
    <div className="py-12 max-w-4xl mx-auto px-4">
      <div className="mb-12 flex flex-col sm:flex-row items-center gap-6">
        {authorProfile.avatar && (
          <Image src={authorProfile.avatar} alt={authorName} width={64} height={64} className="w-16 h-16 rounded-full object-cover" />
        )}
        <div>
          <h1 className="text-5xl font-bold mb-2">{authorName}</h1>
          {authorProfile.bio && <p className="text-gray-400 text-lg mb-2">{authorProfile.bio}</p>}
          {authorProfile.whoami && <p className="text-gray-500 text-sm mb-2">{authorProfile.whoami}</p>}
          {authorProfile.twitter && (
            <a
              href={`https://twitter.com/${authorProfile.twitter}`}
              className="inline-block text-gray-400 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.936 0 .39.045.765.127 1.124C7.728 8.89 4.1 6.89 1.671 3.905c-.427.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89-.386.104-.793.16-1.213.16-.297 0-.583-.028-.862-.08.584 1.823 2.28 3.15 4.29 3.187A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.634A9.936 9.936 0 0 0 24 4.557z"/></svg>
            </a>
          )}
        </div>
      </div>
      {/* Optionally render authorContent as a bio section here if desired */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Articles by {authorName}
        </h2>
        <p className="text-gray-400 text-lg">
          {authorArticles.length} article{authorArticles.length !== 1 ? 's' : ''} published
        </p>
      </div>
      <div className="space-y-12">
        {authorArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}