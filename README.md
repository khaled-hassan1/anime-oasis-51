# Anime Oasis

Anime Oasis is a fan-made anime explorer built with Vite and React. It uses TMDB to show anime, movies, and details for popular series.

## Setup

1. Copy the `.env` file or create your own.
2. Add your TMDB API key to `.env`:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

3. Install dependencies:

```bash
bun install
```

4. Run the app:

```bash
bun run dev
```

## Deploy to GitHub Pages

1. Push your code to a GitHub repository named `anime-oasis-51`.
2. Go to your repository settings > Pages.
3. Set source to "GitHub Actions".
4. Add your TMDB API key to repository secrets:
   - Go to Settings > Secrets and variables > Actions
   - Add new secret: `VITE_TMDB_API_KEY` with your API key value.
5. Push to `main` branch - the deployment will happen automatically.

## Important

- Do not commit your real API key.
- The app reads the TMDB key from `VITE_TMDB_API_KEY` in `.env`.

## Featured Anime Suggestions

- One Piece
- Naruto
- Bleach
- One Punch Man
- Dragon Ball
- Jujutsu Kaisen
- Attack on Titan
- Hunter x Hunter
- Demon Slayer

## Project Files

- `src/lib/tmdb.ts` - TMDB API helper and environment key usage
- `src/components` - UI components
- `src/routes` - page routes

## Gitignore

The repository ignores local environment variables and build artifacts.
