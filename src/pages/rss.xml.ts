// -- rss feed generator endpoint
import type { APIRoute } from 'astro';
import { getAllArticles } from '../lib/articles';

const siteUrl = import.meta.env.SITE_URL || 'https://news-hub.example.com';

// -- format date for rss
const formatRssDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toUTCString();
};

// -- escape xml special characters
const escapeXml = (text: string) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

export const GET: APIRoute = async () => {
  const articles = getAllArticles();
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>News Hub</title>
    <description>Your source for the latest news, technology updates, and diverse topics powered by AI.</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${formatRssDate(new Date().toISOString())}</lastBuildDate>
    <generator>Astro</generator>
    <image>
      <url>${siteUrl}/logo.webp</url>
      <title>News Hub</title>
      <link>${siteUrl}</link>
    </image>
    ${articles.map(article => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <description>${escapeXml(article.excerpt)}</description>
      <link>${siteUrl}/news/${article.slug}</link>
      <guid isPermaLink="true">${siteUrl}/news/${article.slug}</guid>
      <pubDate>${formatRssDate(article.publishedAt)}</pubDate>
      <author>news@newshub.com (${escapeXml(article.author)})</author>
      <category>${escapeXml(article.category)}</category>
      ${article.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('')}
      <content:encoded><![CDATA[${article.content}]]></content:encoded>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
