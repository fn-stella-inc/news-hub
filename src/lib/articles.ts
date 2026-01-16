// -- article data loader from json files
// -- loads articles from category-specific json files

import technologyData from '../data/technology.json';
import topicsData from '../data/topics.json';
import scienceData from '../data/science.json';
import businessData from '../data/business.json';
import cultureData from '../data/culture.json';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  imageUrl: string;
  author: string;
  tags: string[];
}

export interface CategoryData {
  category: string;
  label: string;
  description: string;
  articles: Article[];
}

// -- map category data with proper typing
const categoryDataMap: Record<string, CategoryData> = {
  technology: technologyData as CategoryData,
  topics: topicsData as CategoryData,
  science: scienceData as CategoryData,
  business: businessData as CategoryData,
  culture: cultureData as CategoryData,
};

// -- get all articles from all categories
export function getAllArticles(): Article[] {
  const allArticles: Article[] = [];
  
  Object.values(categoryDataMap).forEach(categoryData => {
    categoryData.articles.forEach(article => {
      allArticles.push({
        ...article,
        category: categoryData.category,
      });
    });
  });
  
  // -- sort by date (newest first)
  return allArticles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// -- export sample articles for compatibility
export const sampleArticles = getAllArticles();

// -- get articles by category
export function getArticlesByCategory(category: string): Article[] {
  if (category === 'all') {
    return getAllArticles();
  }
  
  const categoryData = categoryDataMap[category.toLowerCase()];
  if (!categoryData) {
    return [];
  }
  
  return categoryData.articles.map(article => ({
    ...article,
    category: categoryData.category,
  }));
}

// -- get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find(article => article.slug === slug);
}

// -- get paginated articles
export function getPaginatedArticles(
  page: number = 1,
  limit: number = 6,
  category: string = 'all'
): { articles: Article[]; hasMore: boolean } {
  const filteredArticles = getArticlesByCategory(category);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const articles = filteredArticles.slice(startIndex, endIndex);
  const hasMore = endIndex < filteredArticles.length;
  
  return { articles, hasMore };
}

// -- get all categories
export function getAllCategories(): { slug: string; label: string; description: string }[] {
  return [
    { slug: 'all', label: 'All', description: 'All news and articles' },
    ...Object.values(categoryDataMap).map(data => ({
      slug: data.category,
      label: data.label,
      description: data.description,
    })),
  ];
}

// -- get category info
export function getCategoryInfo(category: string): CategoryData | undefined {
  return categoryDataMap[category.toLowerCase()];
}
