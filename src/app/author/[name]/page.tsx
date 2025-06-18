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
  console.log('Looking for author file:', authorFile);
  let authorProfile = null;

  try {
    const fileContent = await fs.readFile(authorFile, 'utf8');
    const { data } = matter(fileContent);
    authorProfile = data;
    console.log('Author profile loaded successfully:', authorProfile);
  } catch (error) {
    console.log('Error loading author profile:', error);
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
    return str.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  }

  const authorArticles = articles.filter(
    article => slugify(article.author) === authorSlug
  )

  if (authorArticles.length === 0) {
    notFound()
  }

  return (
    <div className="py-6 sm:py-12 max-w-[70rem] mx-auto">
      <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {authorProfile.avatar && (
          <Image src={authorProfile.avatar} alt={authorName} width={200} height={200} className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover" />
        )}
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 leading-tight">{authorName}</h1>
          {authorProfile.bio && <p className="text-gray-400 text-base sm:text-lg mb-4">{authorProfile.bio}</p>}
          {authorProfile.whoami && <p className="text-gray-500 text-sm mb-4">{authorProfile.whoami}</p>}
          {authorProfile.twitter && (
            <a
              href={`https://twitter.com/${authorProfile.twitter}`}
              className="inline-flex items-center text-gray-400 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>@{authorProfile.twitter}</span>
            </a>
          )}
        </div>
      </div>
      {/* Optionally render authorContent as a bio section here if desired */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          Articles by {authorName}
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          {authorArticles.length} article{authorArticles.length !== 1 ? 's' : ''} published
        </p>
      </div>
      <div className="space-y-8 sm:space-y-12">
        {authorArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  // Get unique author slugs
  const authorSlugs = Array.from(new Set(articles.map(article => article.author.toLowerCase().replace(/\s+/g, '-'))));
  return authorSlugs.map(slug => ({ name: slug }));
}