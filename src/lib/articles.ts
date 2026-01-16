// -- sample article data for development and demonstration
// -- in production, this would be replaced by ai-generated content or api calls

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

export const sampleArticles: Article[] = [
  {
    slug: 'ai-revolution-reshaping-industries',
    title: 'The AI Revolution: How Machine Learning is Reshaping Every Industry',
    excerpt: 'From healthcare to finance, artificial intelligence is transforming the way businesses operate and deliver value to customers worldwide.',
    content: `
      <p>Artificial intelligence has moved beyond the realm of science fiction to become an integral part of our daily lives. Major corporations and startups alike are leveraging machine learning algorithms to solve complex problems and create innovative solutions.</p>
      <p>The healthcare sector has seen remarkable advances, with AI-powered diagnostics achieving accuracy rates that rival experienced physicians. Meanwhile, financial institutions are using predictive models to detect fraud and optimize investment strategies.</p>
      <p>As we look to the future, the integration of AI into business processes will only accelerate, creating new opportunities and challenges for organizations worldwide.</p>
    `,
    category: 'Technology',
    publishedAt: '2025-01-15T10:00:00Z',
    readingTime: 8,
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    author: 'News Hub AI',
    tags: ['artificial-intelligence', 'machine-learning', 'technology-trends'],
  },
  {
    slug: 'quantum-computing-breakthrough',
    title: 'Scientists Achieve Major Quantum Computing Breakthrough',
    excerpt: 'Researchers have developed a new error-correction method that brings practical quantum computers closer to reality.',
    content: `
      <p>In a groundbreaking development, a team of international researchers has announced a significant advancement in quantum error correction, addressing one of the most challenging obstacles in quantum computing.</p>
      <p>The new technique reduces quantum decoherence by an order of magnitude, allowing quantum bits (qubits) to maintain their states for unprecedented periods.</p>
      <p>This breakthrough could accelerate the timeline for achieving quantum supremacy in practical applications, from drug discovery to climate modeling.</p>
    `,
    category: 'Science',
    publishedAt: '2025-01-14T14:30:00Z',
    readingTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop',
    author: 'News Hub AI',
    tags: ['quantum-computing', 'science', 'research'],
  },
  {
    slug: 'global-markets-react-policy-changes',
    title: 'Global Markets React to Major Economic Policy Changes',
    excerpt: 'Stock markets worldwide experienced significant volatility as central banks announced coordinated policy adjustments.',
    content: `
      <p>In a rare display of international coordination, major central banks have announced synchronized policy changes aimed at stabilizing global financial markets.</p>
      <p>The coordinated action comes amid growing concerns about inflation and economic uncertainty affecting multiple regions simultaneously.</p>
      <p>Market analysts suggest this could mark the beginning of a new era in international monetary cooperation.</p>
    `,
    category: 'Business',
    publishedAt: '2025-01-13T09:15:00Z',
    readingTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop',
    author: 'News Hub AI',
    tags: ['finance', 'markets', 'economy'],
  },
  {
    slug: 'streaming-wars-new-chapter',
    title: 'The Streaming Wars Enter a New Chapter',
    excerpt: 'Major entertainment companies are restructuring their streaming strategies as subscriber growth plateaus across platforms.',
    content: `
      <p>The streaming industry is undergoing a significant transformation as major players reassess their strategies in response to changing consumer behavior.</p>
      <p>With subscriber growth slowing across platforms, companies are exploring new business models including advertising-supported tiers and bundled offerings.</p>
      <p>Industry experts predict consolidation may be on the horizon as smaller services struggle to compete with established giants.</p>
    `,
    category: 'Culture',
    publishedAt: '2025-01-12T16:45:00Z',
    readingTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=450&fit=crop',
    author: 'News Hub AI',
    tags: ['entertainment', 'streaming', 'media'],
  },
  {
    slug: 'sustainable-energy-milestone',
    title: 'Renewable Energy Reaches Historic Milestone',
    excerpt: 'For the first time, renewable sources generated more electricity than fossil fuels across multiple major economies.',
    content: `
      <p>A historic milestone has been achieved as renewable energy sources have surpassed fossil fuels in electricity generation across several major economies simultaneously.</p>
      <p>Solar and wind power led the charge, benefiting from years of investment and technological improvements that have dramatically reduced costs.</p>
      <p>This shift represents a crucial step toward meeting global climate goals and demonstrates the viability of clean energy at scale.</p>
    `,
    category: 'Science',
    publishedAt: '2025-01-11T11:00:00Z',
    readingTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=450&fit=crop',
    author: 'News Hub AI',
    tags: ['renewable-energy', 'climate', 'sustainability'],
  },
  {
    slug: 'cybersecurity-threats-evolve',
    title: 'Cybersecurity Threats Evolve: What Businesses Need to Know',
    excerpt: 'Security experts warn of sophisticated new attack vectors targeting enterprise infrastructure and remote workers.',
    content: `
      <p>As organizations continue to embrace digital transformation, cybersecurity threats are evolving at an unprecedented pace.</p>
      <p>New attack methodologies are specifically targeting the hybrid work model, exploiting vulnerabilities in home networks and personal devices connected to corporate systems.</p>
      <p>Experts recommend implementing zero-trust architectures and enhancing employee security awareness training to combat these emerging threats.</p>
    `,
    category: 'Technology',
    publishedAt: '2025-01-10T08:30:00Z',
    readingTime: 9,
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop',
    author: 'News Hub AI',
    tags: ['cybersecurity', 'technology', 'business'],
  },
  {
    slug: 'space-exploration-new-era',
    title: 'Space Exploration Enters a New Commercial Era',
    excerpt: 'Private companies are leading ambitious missions that promise to transform our relationship with space.',
    content: `
      <p>The commercialization of space has reached a tipping point, with private companies now leading missions that were once the exclusive domain of government agencies.</p>
      <p>From satellite internet constellations to lunar mining ventures, entrepreneurs are investing billions in projects that promise returns both financial and scientific.</p>
      <p>This shift is democratizing access to space and accelerating innovation in ways previously unimaginable.</p>
    `,
    category: 'Science',
    publishedAt: '2025-01-09T13:20:00Z',
    readingTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=450&fit=crop',
    author: 'News Hub AI',
    tags: ['space', 'exploration', 'commercial-space'],
  },
  {
    slug: 'digital-art-revolution',
    title: 'Digital Art Revolution: Creativity in the Age of AI',
    excerpt: 'Artists are embracing AI tools to push creative boundaries, sparking debates about authenticity and ownership.',
    content: `
      <p>The intersection of artificial intelligence and art is creating a renaissance of digital creativity that challenges traditional notions of artistic expression.</p>
      <p>AI-powered tools are enabling artists to explore new techniques and styles, while also raising important questions about authorship and originality.</p>
      <p>As technology continues to evolve, the art world is grappling with how to adapt its frameworks for this new creative paradigm.</p>
    `,
    category: 'Culture',
    publishedAt: '2025-01-08T15:00:00Z',
    readingTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=450&fit=crop',
    author: 'News Hub AI',
    tags: ['digital-art', 'ai-art', 'creativity'],
  },
];

// -- helper function to get articles by category
export function getArticlesByCategory(category: string): Article[] {
  if (category === 'all') {
    return sampleArticles;
  }
  return sampleArticles.filter(
    article => article.category.toLowerCase() === category.toLowerCase()
  );
}

// -- helper function to get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return sampleArticles.find(article => article.slug === slug);
}

// -- helper function to get paginated articles
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
