# Blog & Portfolio Site

A modern, responsive blog and portfolio website built with Astro.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Luodian/main-page-preview.git
cd main-page-preview
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Start the development server:

```bash
pnpm dev
# or
npm run dev
```

The site will be available at `http://localhost:3000`

### Building for Production

Build the site for production:

```bash
pnpm build
# or
npm run build
```

Preview the production build locally:

```bash
pnpm preview
# or
npm run preview
```

## Contributing Content

### Adding Blog Posts

1. Create a new markdown file in `src/content/post/`
2. Add the required frontmatter:

```yaml
---
title: "Your Post Title"
description: "A brief description of your post (50-160 characters)"
publishDate: "2024-01-15T00:00:00-00:00"
tags: ["tag1", "tag2"] # Optional
draft: false # Optional, set to true to hide from production
---
Your post content here...
```

#### Post Frontmatter Fields

| Field         | Required | Description                                |
| ------------- | -------- | ------------------------------------------ |
| title         | Yes      | Post title (max 60 characters)             |
| description   | Yes      | SEO description (50-160 characters)        |
| publishDate   | Yes      | ISO 8601 format date                       |
| tags          | No       | Array of tag strings                       |
| draft         | No       | Hide post from production (default: false) |
| coverImage    | No       | Object with `src` and `alt` properties     |
| updatedDate   | No       | Date when post was last updated            |
| seriesId      | No       | Group posts into a series                  |
| orderInSeries | No       | Order within a series                      |

### Adding Notes

1. Create a new markdown file in `src/content/note/`
2. Add the required frontmatter:

```yaml
---
title: "Note Title"
publishDate: "2024-01-15T00:00:00-00:00"
description: "Optional description"
---
Your note content...
```

### Adding Authors

Authors are managed in the `authors.yaml` file in the project root. This centralized approach makes it easy to maintain author information across all posts.

#### Adding a New Author

1. Open `authors.yaml` in the project root
2. Add a new entry under the `authors` section:

```yaml
"Author Name":
  name: "Author Name"
  url: "https://author-website.com"
  affiliation: "Institution Name" # Optional
```

#### Using Authors in Posts

In your post frontmatter, reference authors by name:

```yaml
authors:
  - name: "Author Name"
    main: true # Optional: mark as main contributor (shows asterisk)
  - name: "Another Author"
```

**Benefits:**

- URLs are automatically resolved from `authors.yaml`
- Consistent author information across all posts
- Easy to update author URLs in one place
- Support for main contributor marking with asterisks

### Writing Tips

- Use meaningful file names - they become the URL slugs
- Organize related posts with tags
- Set `draft: true` while working on posts
- Include alt text for all images
- Follow existing code style conventions

### Markdown Features

The site supports:

- Standard Markdown syntax
- MDX components
- Code blocks with syntax highlighting
- Admonitions (callouts/alerts)
- Tables, lists, and blockquotes

## Project Structure

```
src/
├── content/
│   ├── post/       # Blog posts
│   └── note/       # Notes
├── pages/          # Site pages
├── components/     # Reusable components
├── layouts/        # Page layouts
└── styles/         # Global styles
```

## Configuration

Main configuration files:

- `src/site.config.ts` - Site metadata and settings
- `astro.config.ts` - Astro configuration
- `src/content/config.ts` - Content schema definitions

## Available Commands

| Command          | Description               |
| ---------------- | ------------------------- |
| `pnpm dev`       | Start development server  |
| `pnpm build`     | Build for production      |
| `pnpm preview`   | Preview production build  |
| `pnpm postbuild` | Build search index        |
| `pnpm sync`      | Generate TypeScript types |

## Contributing Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Test locally with `pnpm build`
5. Commit your changes
6. Push to your fork
7. Open a pull request

### Code Style

- Follow existing conventions in the codebase
- Use TypeScript where applicable
- Ensure responsive design works on mobile
- Test in both light and dark modes

## License

MIT
