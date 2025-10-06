# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15+ website built with React Bricks CMS using the App Router, Tailwind CSS 4.x, and TypeScript. React Bricks is a visual editing CMS that allows creating pages using pre-built "bricks" (components).

## Development Commands

```bash
# Start development server
npm run dev

# Build production site
npm run build

# Start production server
npm start
```

## Architecture

### Directory Structure

- `app/[lang]/` - Next.js App Router pages with i18n support
  - `[[...slug]]/page.tsx` - Dynamic catch-all route for React Bricks pages
  - `blog/` - Blog-related routes (listing, posts, tags)
  - `layout.tsx` - Root layout fetching header/footer from React Bricks
- `app/admin/` - React Bricks admin dashboard routes
- `app/preview/` - React Bricks preview mode
- `react-bricks/` - React Bricks configuration
  - `config.tsx` - Main React Bricks config (API keys, paths, settings)
  - `pageTypes.ts` - Defines available page types (page, blog, layout)
  - `bricks/` - Component library
    - `custom/` - Custom bricks (MyHeroUnit, Pokemon, Thumbnail, ThumbnailGallery)
    - `react-bricks-ui/` - Pre-built UI component library
  - `NextLink.tsx` - Next.js link adapter for React Bricks
- `components/` - Shared React components and error states
- `middleware.ts` - i18n routing middleware
- `i18n-config.ts` - Internationalization config (currently English only)

### React Bricks Integration

React Bricks uses environment variables for configuration:
- `NEXT_PUBLIC_APP_ID` - React Bricks app ID
- `API_KEY` - React Bricks API key (server-side)
- `NEXT_PUBLIC_ENVIRONMENT` - Environment (development/production)

Pages are fetched server-side using `fetchPage()` and rendered with `PageViewer`. The layout fetches header and footer as React Bricks entities.

### Page Types

1. **page** - Standard pages with any bricks
2. **blog** - Blog posts with restricted block types (title, paragraph, big-image, video, code, tweet, blog-title, newsletter-subscribe)
3. **layout** - Header/footer entities (restricted to header/footer blocks)

### Custom Bricks

Custom bricks are in `react-bricks/bricks/custom/` and registered in `react-bricks/bricks/index.ts`. Each brick exports a React Bricks schema with name, label, schema definition, and rendering logic.

### i18n

The site uses Next.js middleware for i18n routing. Currently configured for English only (`i18n-config.ts`). The default locale path (`/en`) is rewritten to root path (`/`).

### Styling

- Tailwind CSS 4.x (v4.0.14) with PostCSS
- Uses `@tailwindcss/forms` plugin
- Font: Nunito Sans (Google Fonts) configured in root layout
- Dark mode supported via `next-themes`

## Key Technical Details

- **Next.js 15.2.2** with App Router and React Server Components
- **React 19** and **React DOM 19**
- **TypeScript 5** with strict mode enabled
- React Strict Mode is disabled (`reactStrictMode: false` in next.config.js)
- Path alias: `@/*` maps to repository root
