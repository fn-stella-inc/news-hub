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

// -- available gemini models (in order of preference)
const GEMINI_MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash-latest',
  'gemini-1.5-pro-latest',
  'gemini-pro',
];

// -- generate article content using gemini
export async function generateArticleContent(
  request: GenerationRequest,
  apiKey: string
): Promise<GeneratedArticle> {
  const { category, description } = request;
  const prompt = buildPrompt(category, description);
  
  let lastError: Error | null = null;
  
  // -- try each model until one works
  for (const model of GEMINI_MODELS) {
    try {
      const result = await callGeminiAPI(model, prompt, apiKey);
      return result;
    } catch (error) {
      lastError = error as Error;
      console.log(`Model ${model} failed, trying next...`);
      continue;
    }
  }
  
  throw lastError || new Error('All Gemini models failed');
}

// -- call gemini api with specific model
async function callGeminiAPI(
  model: string,
  prompt: string,
  apiKey: string
): Promise<GeneratedArticle> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
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
    throw new Error(`Gemini API error (${model}): ${error}`);
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
    
    // -- validate required fields
    if (!article.slug || !article.title || !article.content) {
      throw new Error('Missing required fields in generated article');
    }
    
    return {
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt || article.title,
      content: article.content,
      category: article.category,
      publishedAt: new Date().toISOString(),
      author: 'News Hub AI',
      readingTime: Math.ceil(article.content.split(' ').length / 200),
      imageUrl: article.imageUrl || getCategoryImageUrl(article.category),
      tags: article.tags || [],
    };
  } catch (e) {
    console.error('Failed to parse JSON:', jsonStr);
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
  const imageUrl = getCategoryImageUrl(category);
  
  return `You are a professional news article writer. Generate a high-quality, engaging news article about ${categoryContext}.

${description ? `Specific topic: ${description}` : 'Choose an interesting and timely topic.'}

Requirements:
1. The article should be informative, well-researched, and engaging
2. Use a professional journalistic tone
3. Include relevant facts and insights
4. The content should be 400-600 words
5. Create an appropriate title and excerpt

Return ONLY the JSON below, no other text:
\`\`\`json
{
  "slug": "url-friendly-slug-here",
  "title": "Compelling Article Title",
  "excerpt": "A brief 1-2 sentence summary of the article",
  "content": "The full article content with multiple paragraphs. Use \\n\\n to separate paragraphs. Include subheadings marked with ## for better readability.",
  "category": "${category}",
  "imageUrl": "${imageUrl}",
  "tags": ["tag1", "tag2", "tag3"]
}
\`\`\`

Rules:
- slug: lowercase with hyphens only, no special characters
- content: include ## subheadings for sections, separate paragraphs with \\n\\n
- tags: 3-5 relevant keywords`;
}

// -- get random unsplash image for category
export function getCategoryImageUrl(category: string): string {
  const categoryImages: Record<string, string[]> = {
    technology: [
      'photo-1518770660439-4636190af475',
      'photo-1461749280684-dccba630e2f6',
      'photo-1488590528505-98d2b5aba04b',
      'photo-1550751827-4bd374c3f58b',
      'photo-1526374965328-7f61d4dc18c5',
    ],
    topics: [
      'photo-1522071820081-009f0129c71c',
      'photo-1497032628192-86f99bcd76bc',
      'photo-1552664730-d307ca884978',
      'photo-1517245386807-bb43f82c33c4',
      'photo-1542744173-8e7e53415bb0',
    ],
    science: [
      'photo-1507413245164-6160d8298b31',
      'photo-1532094349884-543bc11b234d',
      'photo-1451187580459-43490279c0fa',
      'photo-1628595351029-c2bf17511435',
      'photo-1507003211169-0a1dd7228f2d',
    ],
    business: [
      'photo-1460925895917-afdab827c52f',
      'photo-1611974789855-9c2a0a7236a3',
      'photo-1507679799987-c73779587ccf',
      'photo-1454165804606-c3d57bc86b40',
      'photo-1486406146926-c627a92ad1ab',
    ],
    culture: [
      'photo-1514320291840-2e0a9bf2a9ae',
      'photo-1493225457124-a3eb161ffa5f',
      'photo-1459749411175-04bf5292ceea',
      'photo-1499364615650-ec38552f4f34',
      'photo-1478147427282-58a87a120781',
    ],
  };
  
  const images = categoryImages[category] || categoryImages.topics;
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return `https://images.unsplash.com/${randomImage}?w=800&h=450&fit=crop`;
}
