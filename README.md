# News Hub

AI-powered news platform built with Astro, featuring content generation with Google Gemini.

![News Hub](https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop)

## Features

- 🚀 **Astro Framework** - Fast, modern static site generation with hybrid rendering
- ✨ **AI Content Generation** - Create articles using Google Gemini API
- 🔍 **Global Search** - Quick search with Ctrl+K keyboard shortcut
- 📱 **Responsive Design** - Beautiful light theme inspired by Starship
- 📂 **Category Filtering** - Browse by Technology, Topics, Science, Business, Culture
- 📡 **RSS Feed** - Subscribe to updates at `/rss.xml`
- 🐳 **Docker Ready** - Containerized with Bun runtime

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Google Gemini API key (for content generation)

### Installation

```bash
# Clone or unzip the project
cd news-hub

# Install dependencies
bun install

# Copy environment variables
cp .env.example .env

# Add your Gemini API key to .env
# GEMINI_API_KEY=your_key_here

# Start development server
bun dev
```

The site will be available at `http://localhost:4321`

## Environment Variables

```properties
# Site configuration
SITE_URL=http://localhost:4321
SITE_NAME=News Hub

# Gemini API (required for content generation)
GEMINI_API_KEY=your_gemini_api_key_here

# Feature flags
ENABLE_AI_CONTENT=true
ENABLE_COMMENTS=false
ENABLE_NEWSLETTER=true
```

## Project Structure

```
news-hub/
├── src/
│   ├── components/     # Reusable UI components
│   ├── data/           # JSON article data by category
│   ├── layouts/        # Page layouts
│   ├── lib/            # Utility functions & API clients
│   ├── pages/          # Routes and pages
│   │   ├── api/        # API endpoints
│   │   ├── news/       # News listing and detail pages
│   │   ├── generate.astro  # AI content generator
│   │   └── index.astro     # Homepage
│   └── styles/         # Global CSS
├── public/             # Static assets
├── Dockerfile          # Bun-based container
└── compose.yml         # Docker Compose config
```

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero and latest articles |
| `/news` | All articles with category filtering |
| `/news?category=technology` | Filter by category |
| `/news/[slug]` | Article detail page |
| `/generate` | AI article generator (requires API key) |
| `/rss.xml` | RSS feed |
| `/api/articles` | JSON API for articles |

## AI Content Generation

1. Navigate to `/generate`
2. Select a category (Technology, Topics, Science, Business, Culture)
3. Optionally provide a topic description
4. Click "Generate Article"
5. The AI will create a complete article and save it to the appropriate JSON file

**Note:** Requires `GEMINI_API_KEY` in your environment variables.

## Search

Press `Ctrl+K` (or `Cmd+K` on Mac) to open the search modal. Features:
- Real-time search across all articles
- Keyboard navigation with arrow keys
- Press Enter to open selected article
- Press Escape to close

## Docker Deployment

### Build and Run

```bash
# Build the image
docker compose build

# Run in production
docker compose up -d

# View logs
docker compose logs -f
```

### Development with Docker

```bash
# Run development server with hot reload
docker compose --profile dev up news-hub-dev
```

## Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun run build` | Build for production |
| `bun start` | Run production server |
| `bun run preview` | Preview production build |

## Tech Stack

- **Framework:** [Astro](https://astro.build/) v4.16+
- **Runtime:** [Bun](https://bun.sh/)
- **AI:** [Google Gemini](https://ai.google.dev/)
- **Icons:** [Lucide](https://lucide.dev/)
- **Styling:** CSS Variables with custom light theme

## License

MIT License - feel free to use this project for your own purposes.

---

Made with ❤️ by News Hub AI
