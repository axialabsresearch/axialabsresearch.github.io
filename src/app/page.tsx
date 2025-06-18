import { getAllArticles } from '@/lib/markdown'
import ArticleList from '../components/ArticleList'
import FilterModalManager from '../components/FilterModalManager'
import { Article } from '../components/ArticleList'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

async function loadAuthorAvatars(articles: Article[]): Promise<Record<string, string>> {
  const authorAvatars: Record<string, string> = {}
  
  for (const article of articles) {
    try {
      const authorSlug = article.author.toLowerCase().replace(/\s+/g, '-')
      const authorFile = path.join(process.cwd(), 'author', `${authorSlug}.md`)
      const fileContent = await fs.readFile(authorFile, 'utf8')
      const { data } = matter(fileContent)
      if (data.avatar) {
        authorAvatars[article.author] = data.avatar
      }
    } catch {
      // Author file doesn't exist or has no avatar, skip
    }
  }
  
  return authorAvatars
}

async function ArticleListWrapper({ articles }: { articles: Article[] }) {
  const authorAvatars = await loadAuthorAvatars(articles)
  return (
    <ArticleList 
      articles={articles} 
      search="" 
      selectedTag="" 
      selectedCategory="" 
      authorAvatars={authorAvatars}
    />
  )
}

export default async function Home() {
  const articles: Article[] = getAllArticles()
  return (
    <FilterModalManager>
      <ArticleListWrapper articles={articles} />
    </FilterModalManager>
  )
}

