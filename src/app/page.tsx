import { getAllArticles } from '@/lib/markdown'
import ArticleList from '../components/ArticleList'

export default function Home() {
  const articles = getAllArticles()
  return <ArticleList articles={articles} />
}

