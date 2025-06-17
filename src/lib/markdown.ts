import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const articlesDirectory = path.join(process.cwd(), 'articles')

export interface Article {
  slug: string
  title: string
  author: string
  date: string
  description: string
  content: string
}

export function getAllArticles(): Omit<Article, 'content'>[] {
  if (!fs.existsSync(articlesDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(articlesDirectory)
  const allArticles = fileNames
    .filter(name => name.endsWith('.md'))
    .map((name) => {
      const slug = name.replace(/\.md$/, '')
      const fullPath = path.join(articlesDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title,
        author: data.author,
        date: data.date,
        description: data.description,
      }
    })

  return allArticles.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = remark()
      .use(html)
      .processSync(content)
      .toString()

    return {
      slug,
      title: data.title,
      author: data.author,
      date: data.date,
      description: data.description,
      content: processedContent,
    }
  } catch {
    return null
  }
}
