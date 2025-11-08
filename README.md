# LMMS Blog & Portfolio Site

A modern, responsive blog and portfolio website built with Astro, featuring advanced content authoring with MDX, interactive React components, and a sophisticated content management system for research publications and technical documentation.

## Features ✨

- **MDX Support**: Enhanced markdown with React components
- **Interactive Components**: CodeDemo, ResourceCard, and more
- **Content Collections**: Type-safe content management for posts, notes, and series
- **Author Management**: Centralized author database with automatic URL resolution
- **Related Posts**: Smart recommendation system with manual overrides
- **Responsive Design**: Mobile-first approach with dark/light mode support
- **SEO Optimized**: Comprehensive metadata and Open Graph support

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

## Content Creation Guide

### Blog Posts

Create rich, interactive blog posts using either Markdown (`.md`) or MDX (`.mdx`) files in `src/content/post/`.

#### Basic Post Structure

```yaml
---
title: "Your Post Title"
description: "SEO-optimized description (50-160 characters recommended)"
publishDate: "2024-01-15T00:00:00Z"
# Primary tags for categorization
mainTags: ["ai", "research"] # recommended to only use 1 or 2 mainTags
tags: ["ai", "research", "machine-learning", "computer-vision"] # Additional tags (include mainTags again)
---
# Your content here
```

#### Complete Frontmatter Reference

| Field             | Type        | Required | Description                                  | Used In                       |
| ----------------- | ----------- | -------- | -------------------------------------------- | ----------------------------- |
| `title`           | string      | ✓        | Post title (recommended: max 60 chars)       | All components, SEO           |
| `description`     | string      | ✓        | SEO meta description (50-160 chars)          | SEO, social shares            |
| `publishDate`     | date/string | ✓        | Publication date (ISO 8601 format)           | Post listing, sorting         |
| `mainTags`        | array       | ✓        | Primary categories (used for related posts)  | BlogGrid filters, KeepReading |
| `tags`            | array       |          | Additional tags for detailed categorization  | Tag pages, search             |
| `thumbnail`       | string      |          | Featured image URL for post previews         | BlogGrid, KeepReading         |
| `coverImage`      | object      |          | `{src: image(), alt: string}` for hero image | BlogPost layout               |
| `draft`           | boolean     |          | Hide from production (default: false)        | Content filtering             |
| `ogImage`         | string      |          | Custom Open Graph image                      | Social media shares           |
| `updatedDate`     | date/string | ✓        | Last modification date                       | Post footer                   |
| `seriesId`        | string      |          | Link to series collection                    | Series navigation             |
| `orderInSeries`   | number      |          | Position within series                       | Series ordering               |
| `author`          | object      |          | Single author `{name, url?, main?}`          | Post footer, bylines          |
| `authors`         | array       |          | Multiple authors (same format as author)     | Post footer, bylines          |
| `acknowledgement` | string      |          | Acknowledgment text                          | Post footer                   |
| `bibtex`          | string      |          | BibTeX citation                              | Post footer                   |
| `related`         | array       |          | Manual related post IDs (max 3)              | KeepReading component         |

#### Content Format Options

**Markdown (.md)**: Traditional markdown with all standard features

```markdown
# Heading

Regular markdown content with **bold** and _italic_ text.
```

**MDX (.mdx)**: Enhanced markdown with React components

````mdx
import { CodeDemo, ResourceCard } from "@/components/mdx/components";

# Enhanced Content

<CodeDemo title="Python Example">```python print("Hello, World!") ```</CodeDemo>
````

### Notes

Create quick thoughts and informal content in `src/content/note/`.

```yaml
---
title: "Quick Note Title"
publishDate: "2024-01-15T18:26:00Z"
description: "Optional description"
image: "https://example.com/image.jpg" # Optional thumbnail
---
Your note content...
```

### Series

Group related posts into series using `src/content/series/`.

```yaml
---
title: "Series Title"
description: "Series description"
featured: true # Show in featured series list
---
```

Reference in posts using:

```yaml
seriesId: "your-series-id"
orderInSeries: 1
```

## MDX Components

### CodeDemo

Enhanced code blocks with copy functionality and professional styling.

````mdx
<CodeDemo title="Installation" language="bash" showCopy={true}>
  ```bash npm install package-name ```
</CodeDemo>
````

**Props:**

- `title?`: string - Optional header title
- `language?`: string - Language for syntax highlighting (default: "bash")
- `showCopy?`: boolean - Show copy button (default: true)

### ResourceCard

Professional resource links with icons and metadata.

```mdx
<ResourceCard
  title="Project Resources"
  description="Essential links and materials"
  resources={[
    {
      type: "github",
      title: "Source Code",
      description: "Complete implementation",
      url: "https://github.com/user/repo",
    },
    {
      type: "paper",
      title: "Research Paper",
      url: "https://arxiv.org/abs/2024.12345",
    },
  ]}
/>
```

**Resource Types:** `github`, `paper`, `model`, `dataset`, `demo`, `link`

**Grouped Resources:**

```mdx
<ResourceCard
  groups={[
    {
      type: "model",
      title: "Model Variants",
      description: "Different model configurations",
      items: [
        { name: "Base Model", url: "https://...", metadata: "7B params" },
        { name: "Large Model", url: "https://...", metadata: "13B params" },
      ],
    },
  ]}
/>
```

### ResponsiveImage

Optimized responsive images with lazy loading, captions, and flexible styling.

```mdx
<ResponsiveImage
  src="/images/example.jpg"
  alt="Description of the image"
  caption="Optional image caption"
  align="center"
  maxWidth="80%"
  rounded={true}
/>
```

**Props:**

- `src`: string - Image source URL (required)
- `alt`: string - Alt text for accessibility (required)
- `caption?`: string - Optional caption text below image
- `align?`: "left" | "center" | "right" - Image alignment (default: "center")
- `maxWidth?`: string - Maximum width constraint (default: "90%")
- `rounded?`: boolean - Apply rounded corners (default: true)
- `className?`: string - Additional CSS classes
- `loading?`: "lazy" | "eager" - Loading strategy (default: "lazy")

**Features:**

- Automatic responsive sizing
- Lazy loading by default
- Hover shadow effects
- Error handling with console logging
- Semantic HTML with `<figure>` and `<figcaption>`

### Other MDX Components

- **Callout**: `<Callout type="info|warning|error|success" title="Title">Content</Callout>`
- **Gallery**: `<Gallery images={[{src, alt, caption}]} columns={3} />`
- **LiveCodeEditor**: `<LiveCodeEditor defaultCode="console.log('Hello')" />`
- **Badge**: `<Badge variant="outline">Label</Badge>`

## Author Management

Authors are centrally managed in `authors.yaml` for consistency across all posts. It is recommended to maintain a updated authors.yaml so it can be reused in future posts.

### Adding Authors

Edit `authors.yaml`:

```yaml
authors:
  "Author Name":
    name: "Author Name"
    url: "https://author-website.com"
    affiliation: "Institution Name" # Optional
```

### Using Authors in Posts

Reference by name in frontmatter:

```yaml
authors:
  - name: "Author Name"
    main: true # Shows asterisk for main contributor
  - name: "Co-Author Name"
    url: "https://co-author-website.com" # Overwrites authors.yaml
```

If no authors are listed, then defaults to `LMMs-Lab Team`

**Fallback Behavior:**

- If author exists in `authors.yaml`: Uses database information
- If author not in database: Uses frontmatter data directly
- URLs can be overridden in frontmatter if needed

## Component Usage Guide

### Related Posts System

The KeepReading component automatically suggests related posts using a smart algorithm:

1. **Manual relations** (frontmatter `related` field) - highest priority
2. **MainTag matches** - posts sharing primary categories
3. **Latest posts** - fallback for new content

### Content Schema Validation

All content is validated using Zod schemas defined in `src/content.config.ts`:

- Type safety at build time
- Automatic transformations (date parsing, tag normalization)
- Clear error messages for invalid content

### Default Behaviors

- **Draft posts**: Hidden in production, visible in development
- **Missing thumbnails**: Graceful fallback to default images
- **Author URLs**: Auto-resolved from authors.yaml database
- **Related posts**: Smart algorithm with manual override capability
- **Tags**: Automatically lowercased and deduplicated
- **Images**: Lazy loading with skeleton placeholders

## Project Structure

```
src/
├── content/
│   ├── post/           # Blog posts (.md, .mdx)
│   ├── note/           # Notes and quick thoughts
│   └── series/         # Post series definitions
├── components/
│   ├── mdx/           # MDX-specific components
│   │   ├── CodeDemo.astro
│   │   ├── ResourceCard.tsx
│   │   ├── Callout.astro
│   │   └── Gallery.astro
│   ├── blog/          # Blog-specific components
│   ├── react/         # React components
│   └── ui/            # Base UI components
├── layouts/
│   ├── BlogPost.astro     # Standard markdown layout
│   ├── MDXBlogPost.astro  # MDX layout with imports
│   └── Base.astro         # Site-wide layout
├── pages/             # Site pages and API routes
└── styles/            # Global styles and themes
```

## Configuration

### Main Config Files

- `src/site.config.ts` - Site metadata and settings
- `astro.config.ts` - Astro and MDX configuration
- `src/content.config.ts` - Content schema definitions
- `authors.yaml` - Author database
- `tailwind.config.ts` - Styling and typography

### Environment Setup

```bash
# Development
pnpm dev

# Type checking
pnpm astro sync

# Build validation
pnpm build
```

## Advanced Features

### Markdown Processing Pipeline

**Remark Plugins** (Content Processing):

- Reading time calculation
- Custom directives (:::note, :::warning)
- Math equation support
- Collapsible sections

**Rehype Plugins** (HTML Processing):

- Syntax highlighting (rehype-pretty-code)
- External link handling
- Image optimization
- Math rendering (KaTeX)

### Styling System

**Tailwind Typography**: Custom "citrus" prose theme

```css
prose-citrus {
  /* Headings with accent colors */
  prose-headings:text-accent-base

  /* Enhanced links */
  prose-a:text-accent

  /* Professional code blocks */
  prose-pre:bg-neutral-50
}
```

## Available Commands

| Command            | Description               |
| ------------------ | ------------------------- |
| `pnpm dev`         | Start development server  |
| `pnpm build`       | Build for production      |
| `pnpm preview`     | Preview production build  |
| `pnpm astro sync`  | Generate TypeScript types |
| `pnpm astro check` | Type checking             |

## Writing Guidelines

### Content Best Practices

- **File naming**: Use kebab-case, descriptive names (becomes URL slug)
- **Frontmatter**: Always include required fields
- **Images**: Optimize before adding, include alt text
- **Tags**: Use consistent, lowercase tags
- **Series**: Group related content for better navigation

### MDX Best Practices

- Import components at the top of MDX files
- Use semantic component props
- Test interactive components in development
- Maintain consistent spacing around components

### SEO Optimization

- Write compelling meta descriptions (50-160 characters)
- Use descriptive titles (under 60 characters)
- Include relevant keywords in tags
- Optimize images with proper alt text
- Leverage OpenGraph metadata for social sharing

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Add your content or make changes
4. Test locally with `pnpm build`
5. Commit your changes with clear messages
6. Push to your fork and open a pull request

### Code Style

- Follow existing TypeScript conventions
- Use semantic HTML in components
- Ensure responsive design works on all devices
- Test both light and dark modes
- Validate content schema compliance

## License

MIT - Feel free to use this template for your own projects!
