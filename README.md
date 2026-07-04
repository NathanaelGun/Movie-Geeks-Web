# Movie Geeks Web

A cinematic movie discovery and tracking web application built with Next.js 15 and the TMDB API. Features a dark Cinematic Noir design system with glassmorphic UI components, real-time movie search, and a personal rating and watchlist system.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with a custom Cinematic Noir design system
- **API**: The Movie Database (TMDB) — v3 REST API
- **Icons**: Google Material Symbols Outlined
- **Fonts**: Google Fonts (loaded via layout head)
- **Storage**: Browser `localStorage` for user ratings and watchlist

---

## Features

- **Movie Search** — Search millions of titles via the TMDB API with paginated results
- **Movie Details Modal** — View full details including plot, cast, director, runtime, and TMDB rating
- **Star Rating System** — Rate any movie from 1 to 5 stars; ratings persist across sessions
- **Personal Watchlist** — Every rated movie is automatically added to your watchlist at `/mylist`
- **Remove from Watchlist** — Remove individual entries directly from the watchlist view
- **Profile Stats** — The profile page displays live counts of your rated and watched movies
- **Offline Fallback** — A local mock database is used when no API credentials are configured

---

## Getting Started

### Prerequisites

- Node.js 18+
- A TMDB API account — register at [themoviedb.org](https://www.themoviedb.org/signup)

### Installation

```bash
git clone https://github.com/NathanaelGun/Movie-Geeks-Web.git
cd Movie-Geeks-Web
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Option 1 — Read Access Token (recommended)
TMDB_ACCESS_TOKEN=your_bearer_token_here

# Option 2 — API Key (v3)
TMDB_API_KEY=your_api_key_here
```

Both variables are supported simultaneously. The access token takes precedence when both are present. If neither is configured, the app will serve results from a local mock database.

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
Movie-Geeks-Web/
├── app/
│   ├── (main)/
│   │   ├── movies/          # Search and browse page
│   │   ├── mylist/          # Personal watchlist (client component, localStorage)
│   │   └── profile/         # User profile with live stats
│   ├── api/movies/
│   │   ├── route.tsx        # Server-side TMDB API proxy
│   │   ├── tmdbHelper.ts    # TMDB fetch utilities and data mapping
│   │   └── mockDatabase.ts  # Offline fallback movie catalog
│   ├── globals.css          # Tailwind v4 theme tokens and global styles
│   ├── layout.tsx           # Root layout with Navbar and font loading
│   └── page.tsx             # Home page with category bento grid
├── Components/
│   ├── Navbar.tsx           # Glassmorphic navigation bar
│   ├── MovieCard.tsx        # Individual movie card component
│   ├── MovieGrid.tsx        # Movie grid with loading state
│   └── MovieDetail.tsx      # Detail modal with rating system
└── lib/
    └── watchlist.ts         # localStorage utilities for ratings and watchlist
```

---

## Design System

The UI follows a custom **Cinematic Noir** design system defined in `globals.css` using Tailwind CSS v4 `@theme` tokens.

| Token | Value | Usage |
|---|---|---|
| `--color-background` | `#0d0f14` | Page background |
| `--color-primary` | `#f2ca50` | Matte gold — headings, accents, ratings |
| `--color-secondary` | `#4a9eff` | Electric blue — active states |
| `--color-surface-container-low` | `#1a1d24` | Card backgrounds |
| `--color-on-surface-variant` | `#8a8fa8` | Secondary text |

Glassmorphic utility classes (`.glass-card`, `.glass-panel`) are defined globally using `backdrop-blur` and semi-transparent borders.

---

## API Reference

All client-side detail requests are routed through the server-side proxy at `/api/movies` to keep credentials private.

| Query Param | Description |
|---|---|
| `?s=query&page=1` | Search movies by title |
| `?i=tmdb_id` | Fetch full details for a single movie |

---

## Notes

- The `.env.local` file is excluded from version control. Do not commit API credentials.
- The `localStorage` watchlist is browser-specific and not synced across devices.
- TMDB image domains (`image.tmdb.org`) are configured in `next.config.ts` for `next/image` optimization.
