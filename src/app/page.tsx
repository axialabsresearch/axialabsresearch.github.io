import { getAllArticles } from '@/lib/markdown'
import ArticleList from '../components/ArticleList'
import FilterModalManager from '../components/FilterModalManager'
import { Article } from '../components/ArticleList'

export default function Home() {
  const articles: Article[] = getAllArticles()
  return (
    <FilterModalManager>
      <ArticleList articles={articles} search="" selectedTag="" selectedCategory="" />
    </FilterModalManager>
  )
}

