---
// -- api endpoint for fetching articles (htmx compatible)
import type { APIRoute } from 'astro';
import { getPaginatedArticles, type Article } from '../../lib/articles';

// -- generate article card html for htmx responses
function generateArticleCardHtml(article: Article, featured: boolean = false): string {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      technology: 'category-tech',
      science: 'category-science',
      business: 'category-business',
      culture: 'category-culture',
      default: 'category-default',
    };
    return colors[cat.toLowerCase()] || colors.default;
  };

  const featuredClass = featured ? 'article-card-featured' : '';

  return `
    <article class="article-card ${featuredClass}">
      <a href="/news/${article.slug}" class="card-link" aria-label="Read article: ${article.title}">
        <div class="card-image-wrapper">
          <img 
            src="${article.imageUrl}" 
            alt=""
            class="card-image"
            loading="lazy"
            decoding="async"
          />
          <div class="card-image-overlay" aria-hidden="true"></div>
        </div>
        <div class="card-content">
          <div class="card-meta">
            <span class="card-category ${getCategoryColor(article.category)}">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
              ${article.category}
            </span>
            <div class="card-meta-right">
              <span class="card-date">${formatDate(article.publishedAt)}</span>
              <span class="card-reading-time">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${article.readingTime} min
              </span>
            </div>
          </div>
          <h3 class="card-title">${article.title}</h3>
          <p class="card-excerpt">${article.excerpt}</p>
          <div class="card-action">
            <span class="action-text">Read Article</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="action-icon"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </div>
        </div>
      </a>
    </article>
  `;
}

export const GET: APIRoute = async ({ request }) => {
  // -- parse query parameters
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const category = url.searchParams.get('category') || 'all';
  const limit = parseInt(url.searchParams.get('limit') || '6');

  // -- get paginated articles
  const { articles, hasMore } = getPaginatedArticles(page, limit, category);

  // -- check if htmx request
  const isHtmxRequest = request.headers.get('HX-Request') === 'true';

  if (isHtmxRequest) {
    // -- return html for htmx
    if (articles.length === 0) {
      return new Response(
        '<div data-end-of-articles class="no-more-articles">No more articles to load.</div>',
        {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    const html = articles.map((article, index) => 
      generateArticleCardHtml(article, page === 1 && index === 0)
    ).join('');

    // -- add end marker if no more articles
    const endMarker = !hasMore ? '<div data-end-of-articles style="display:none;"></div>' : '';

    return new Response(html + endMarker, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }

  // -- return json for api consumers
  return new Response(
    JSON.stringify({
      articles,
      page,
      hasMore,
      category,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
