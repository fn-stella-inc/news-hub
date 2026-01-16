// -- api endpoint for generating articles with gemini
export const prerender = false;

import type { APIRoute } from 'astro';
import { generateArticleContent, getCategoryImageUrl } from '../../lib/gemini';
import * as fs from 'fs';
import * as path from 'path';

export const POST: APIRoute = async ({ request }) => {
  try {
    // -- get api key from environment
    const apiKey = import.meta.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'GEMINI_API_KEY not configured' 
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    // -- parse request body
    const body = await request.json();
    const { category, description } = body;
    
    if (!category) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Category is required' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    // -- generate article content
    const article = await generateArticleContent(
      { category, description },
      apiKey
    );
    
    // -- ensure image url is valid
    if (!article.imageUrl || !article.imageUrl.startsWith('http')) {
      article.imageUrl = getCategoryImageUrl(category);
    }
    
    // -- save to json file
    const saved = await saveArticleToJson(article);
    
    return new Response(
      JSON.stringify({
        success: true,
        article,
        saved,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({
        success: false,
        error: message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

// -- save article to the appropriate json file
async function saveArticleToJson(article: any): Promise<boolean> {
  try {
    const dataDir = path.join(process.cwd(), 'src', 'data');
    const filePath = path.join(dataDir, `${article.category}.json`);
    
    // -- read existing data
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    // -- check if slug already exists
    const existingIndex = data.articles.findIndex(
      (a: any) => a.slug === article.slug
    );
    
    if (existingIndex >= 0) {
      // -- update existing article
      data.articles[existingIndex] = article;
    } else {
      // -- add new article at the beginning
      data.articles.unshift(article);
    }
    
    // -- write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    
    return true;
  } catch (error) {
    console.error('Failed to save article:', error);
    return false;
  }
}
