import { getAllArticles } from '@/lib/markdown'
import ArticleList from '/home/tnxl/frostgate/axialabsresearch.github.io/src/components/ArticleList'

export default function Home() {
  const articles = getAllArticles()
  return <ArticleList articles={articles} />
}

