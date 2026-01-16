// -- gemini api integration for content generation

export interface GeneratedArticle {
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

export interface GenerationRequest {
  category: string;
  description?: string;
}

// -- generate article content using gemini
export async function generateArticleContent(
  request: GenerationRequest,
  apiKey: string
): Promise<GeneratedArticle> {
  const { category, description } = request;
  
  const prompt = buildPrompt(category, description);
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096,
        },
      }),
    }
  );
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${error}`);
  }
  
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error('No content generated');
  }
  
  // -- parse the generated JSON
  const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/);
  const jsonStr = jsonMatch ? jsonMatch[1] : text;
  
  try {
    const article = JSON.parse(jsonStr.trim());
    return {
      ...article,
      publishedAt: new Date().toISOString(),
      author: 'News Hub AI',
      readingTime: Math.ceil(article.content.split(' ').length / 200),
    };
  } catch (e) {
    throw new Error('Failed to parse generated content');
  }
}

// -- build prompt for article generation
function buildPrompt(category: string, description?: string): string {
  const categoryDescriptions: Record<string, string> = {
    technology: 'technology, software, AI, gadgets, digital innovation',
    topics: 'trending topics, current affairs, lifestyle, work trends',
    science: 'scientific discoveries, research, space, nature, environment',
    business: 'business news, markets, economy, entrepreneurship, finance',
    culture: 'arts, entertainment, music, movies, cultural trends',
  };
  
  const categoryContext = categoryDescriptions[category] || category;
  
  return `You are a professional news article writer. Generate a high-quality, engaging news article about ${categoryContext}.

${description ? `Additional context/topic: ${description}` : ''}

Requirements:
1. The article should be informative, well-researched, and engaging
2. Use a professional journalistic tone
3. Include relevant facts and insights
4. The content should be 400-600 words
5. Create an appropriate title and excerpt

Return the article in this exact JSON format (no other text, just the JSON):
\`\`\`json
{
  "slug": "url-friendly-slug-here",
  "title": "Compelling Article Title",
  "excerpt": "A brief 1-2 sentence summary of the article",
  "content": "The full article content with multiple paragraphs. Use \\n\\n to separate paragraphs. Include subheadings marked with ## for better readability.",
  "category": "${category}",
  "imageUrl": "https://images.unsplash.com/photo-[relevant-unsplash-id]?w=800&h=450&fit=crop",
  "tags": ["tag1", "tag2", "tag3"]
}
\`\`\`

Important: 
- The slug should be lowercase with hyphens, no special characters
- The imageUrl should be a valid Unsplash URL that relates to the topic
- Tags should be relevant keywords (3-5 tags)
- Content should include ## subheadings for sections`;
}

// -- get random unsplash image for category
export function getCategoryImageUrl(category: string): string {
  const categoryImages: Record<string, string[]> = {
    technology: [
      'photo-1518770660439-4636190af475',
      'photo-1461749280684-dccba630e2f6',
      'photo-1488590528505-98d2b5aba04b',
    ],
    topics: [
      'photo-1522071820081-009f0129c71c',
      'photo-1497032628192-86f99bcd76bc',
      'photo-1552664730-d307ca884978',
    ],
    science: [
      'photo-1507413245164-6160d8298b31',
      'photo-1532094349884-543bc11b234d',
      'photo-1451187580459-43490279c0fa',
    ],
    business: [
      'photo-1460925895917-afdab827c52f',
      'photo-1611974789855-9c2a0a7236a3',
      'photo-1507679799987-c73779587ccf',
    ],
    culture: [
      'photo-1514320291840-2e0a9bf2a9ae',
      'photo-1493225457124-a3eb161ffa5f',
      'photo-1459749411175-04bf5292ceea',
    ],
  };
  
  const images = categoryImages[category] || categoryImages.topics;
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return `https://images.unsplash.com/${randomImage}?w=800&h=450&fit=crop`;
}
