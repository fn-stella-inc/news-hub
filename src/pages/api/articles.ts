// -- api endpoint for fetching articles (JSON API)
// -- this endpoint is server-rendered
export const prerender = false;

import type { APIRoute } from 'astro';
import { getArticlesByCategory } from '../../lib/articles';

export const GET: APIRoute = async ({ request }) => {
  // -- parse query parameters
  const url = new URL(request.url);
  const category = url.searchParams.get('category') || 'all';

  // -- get articles by category
  const articles = getArticlesByCategory(category);

  // -- return json response
  return new Response(
    JSON.stringify({
      articles,
      category,
      total: articles.length,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
    }
  );
};
