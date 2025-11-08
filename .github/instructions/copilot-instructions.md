# Copilot Instructions for Blog System

## Project Overview

This is an Astro-based blog system with TypeScript, Tailwind CSS, and content collections. The blog processes markdown files into styled web pages with a sophisticated content processing pipeline.

## Architecture Overview

### Content Flow

```
Markdown File → Content Schema → Route Generation → Layout Application → Styled Output
```

1. **Content Source**: Markdown files in `src/content/post/`
2. **Schema Processing**: Validated through `src/content.config.ts`
3. **Route Generation**: Dynamic routes via `src/pages/posts/[...slug].astro`
4. **Layout Application**: Styled through `src/layouts/BlogPost.astro`
5. **Component Integration**: Masthead, TOC, and other blog components

## File Structure & Responsibilities

### Core Files

- `src/content.config.ts` - Content collection schema and validation
- `src/layouts/BlogPost.astro` - Main blog post layout and styling
- `src/pages/posts/[...slug].astro` - Dynamic route generation for posts
- `astro.config.ts` - Markdown processing pipeline configuration
- `tailwind.config.ts` - Typography and styling configuration

### Blog Components

- `src/components/blog/Masthead.astro` - Post header (title, date, tags, cover)
- `src/components/blog/TOC.astro` - Table of contents generation
- `src/components/blog/PostPreview.astro` - Post preview cards
- `src/components/SeriesPanel.astro` - Series navigation
- `src/components/BlogGrid.astro` - Post grid layout

### Content Structure

- `src/content/post/` - Blog post markdown and MDX files
- `src/content/series/` - Blog series definitions
- `src/content/note/` - Note/quick thoughts
- `public/images/blog_thumbnails/` - Post thumbnail images

### MDX Components

- `src/components/mdx/` - Custom components for MDX files
  - `Callout.astro` - Info, warning, success, error callouts
  - `CodeDemo.astro` - Enhanced code blocks with copy functionality
  - `Gallery.astro` - Image galleries with captions
  - `LiveCodeEditor.tsx` - Interactive JavaScript code editor
- `src/layouts/MDXBlogPost.astro` - Layout for MDX files with component imports

## MDX Support

### Writing MDX Posts

Create `.mdx` files in `src/content/post/` to use custom components alongside markdown:

````mdx
---
title: "My Enhanced Post"
description: "Using custom components"
publishDate: "2025-11-08"
tags: ["mdx", "components"]
---

import { Callout, CodeDemo } from "@/layouts/MDXBlogPost.astro";

# Regular Markdown

<Callout type="info" title="Enhanced Content">
  You can use **markdown** inside components!
</Callout>

<CodeDemo title="Example Code">
```javascript
console.log("Hello from MDX!");
````

</CodeDemo>
```

### Available MDX Components

- **Callout**: Info/warning/success/error callouts with markdown support
- **CodeDemo**: Enhanced code blocks with copy functionality
- **Gallery**: Multi-column image galleries with captions
- **LiveCodeEditor**: Interactive JavaScript code editor (React)
- **Badge**: Inline tags and labels
- **LazyImage**: Optimized image loading

### MDX vs Markdown

- Use `.mdx` for posts with custom components or interactivity
- Use `.md` for simple text-based posts
- Both use the same frontmatter schema
- Both support the same styling and features

## Content Schema (src/content.config.ts)

### Post Frontmatter Fields

```typescript
{
  title: string,           // Post title
  description: string,     // Post description/excerpt
  publishDate: Date,       // Publication date
  tags: string[],          // Array of tags
  thumbnail?: string,      // Thumbnail image path
  draft?: boolean,         // Draft status
  series?: string,         // Series identifier
  seriesOrder?: number     // Order in series
}
```

### Schema Extensions

When adding new frontmatter fields:

1. Update the schema in `src/content.config.ts`
2. Update TypeScript types in `src/types.ts`
3. Handle the field in relevant components (Masthead, PostPreview, etc.)

## Styling System

### Prose Typography

The blog uses Tailwind Typography with a custom "citrus" theme defined in `tailwind.config.ts`:

```css
prose-citrus {
  /* Headings */
  prose-headings:font-semibold
  prose-headings:text-accent-base
  prose-headings:before:text-accent-two

  /* Links */
  prose-a:text-accent
  prose-a:decoration-accent/50

  /* Code blocks */
  prose-pre:relative
  prose-pre:py-1.5

  /* Images */
  prose-img:rounded-lg
}
```

### CSS Class Patterns

- `accent-base` - Primary accent color
- `accent-two` - Secondary accent color
- `special-light` - Light border color
- `text-quote` - Blockquote text color

## Markdown Processing Pipeline

### Remark Plugins (Content Processing)

- `remarkReadingTime` - Adds reading time calculation
- `remarkDirective` - Enables custom directives (:::note, :::warning)
- `remarkAdmonitions` - Callout boxes and alerts
- `remarkCollapsible` - Collapsible content sections
- `remarkMath` - Mathematical equation support

### Rehype Plugins (HTML Processing)

- `rehypeExternalLinks` - External link handling
- `rehypePrettyCode` - Syntax highlighting for code blocks
- `rehypeUnwrapImages` - Image processing and optimization
- `rehypeKatex` - Math equation rendering

### Custom Plugins Location

Custom remark/rehype plugins are in `src/plugins/`:

- `remark-admonitions.ts`
- `remark-collapsible.ts`
- `remark-lazy-images.ts`
- `remark-reading-time.ts`

## Component Development Guidelines

### Blog Post Layout (src/layouts/BlogPost.astro)

Structure:

1. Background gradients and visual effects
2. Masthead component (title, meta, cover image)
3. TOC component (table of contents)
4. Series panel (if post is part of a series)
5. Main content area with prose styling
6. Footer and navigation

### Masthead Component (src/components/blog/Masthead.astro)

Displays:

- Post title
- Publication date and reading time
- Tags as clickable badges
- Cover/thumbnail image
- Series information and navigation

### TOC Component (src/components/blog/TOC.astro)

- Auto-generates from markdown headings
- Smooth scroll navigation
- Active section highlighting
- Collapsible on mobile

## Common Development Patterns

### Adding New Post Features

1. **New frontmatter field**: Update schema in `content.config.ts`
2. **Display the field**: Modify `Masthead.astro` or `BlogPost.astro`
3. **Style the field**: Add Tailwind classes or update `tailwind.config.ts`
4. **Type safety**: Update types in `src/types.ts`

### Custom Markdown Elements

For custom markdown components:

1. Create Astro component in `src/components/`
2. Use as MDX component or via remark plugin
3. Style with Tailwind classes
4. Test with existing prose styling

### Image Handling

- Thumbnails: Store in `public/images/blog_thumbnails/`
- Post images: Store in `public/images/[post_name]_images/`
- Use lazy loading with `LazyImage.astro` component
- Images are processed through `rehypeUnwrapImages`

## Performance Considerations

### Data Packing

- Uses offline parallel data packing for efficiency
- Reduces padding waste in multimodal sequences
- Hash-bucket clustering by content length

### Image Optimization

- Lazy loading implemented via `remark-lazy-images.ts`
- Responsive images with proper sizing
- Thumbnail generation for post previews

### Build Optimization

- Static site generation with Astro
- Content collections for type safety
- Tree shaking with modern bundling

## Development Workflow

### Adding a New Blog Post

1. Create `.md` file in `src/content/post/`
2. Add required frontmatter (title, description, publishDate, tags)
3. Add thumbnail to `public/images/blog_thumbnails/`
4. Add post images to `public/images/[post_name]_images/`
5. Write content with markdown and custom directives
6. Test locally with `npm run dev`

### Customizing Post Styling

1. **Global changes**: Modify `tailwind.config.ts` prose theme
2. **Layout changes**: Edit `src/layouts/BlogPost.astro`
3. **Component changes**: Edit specific components like `Masthead.astro`
4. **Custom CSS**: Add to `src/styles/global.css`

### Adding Custom Markdown Features

1. Create remark/rehype plugin in `src/plugins/`
2. Register plugin in `astro.config.ts`
3. Add corresponding styles to Tailwind config
4. Document usage for content creators

## Testing & Quality Assurance

### Content Validation

- Schema validation via Zod in `content.config.ts`
- TypeScript type checking for components
- Frontmatter field validation

### Style Testing

- Test prose styling with various content types
- Verify responsive design across devices
- Check dark/light mode compatibility
- Validate accessibility with screen readers

### Performance Testing

- Check image loading and lazy loading
- Verify build times and bundle sizes
- Test navigation and smooth scrolling
- Validate SEO meta tags and structured data

## Common Issues & Solutions

### Content Schema Issues

- **Missing required fields**: Check frontmatter completeness
- **Date format errors**: Use ISO date format (YYYY-MM-DD)
- **Image path issues**: Use absolute paths from `public/`

### Styling Issues

- **Prose conflicts**: Check Tailwind prose class specificity
- **Layout breaks**: Verify component slot usage
- **Image sizing**: Use responsive classes and aspect ratios

### Build Issues

- **Import errors**: Check relative path imports
- **Type errors**: Verify content schema matches usage
- **Plugin errors**: Check remark/rehype plugin compatibility

## Best Practices

### Content Creation

- Use semantic heading hierarchy (h1 → h2 → h3)
- Optimize images before adding to repository
- Write descriptive alt text for accessibility
- Use consistent tagging system

### Component Development

- Follow Astro component patterns
- Use TypeScript for props and data
- Implement responsive design by default
- Consider dark mode in color choices

### Performance

- Lazy load images and heavy content
- Minimize CSS bundle size
- Use semantic HTML for better SEO
- Implement proper caching strategies

This instruction set should help GitHub Copilot provide more contextually appropriate suggestions for your blog system development.
