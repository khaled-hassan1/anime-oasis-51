# Anime Oasis

Anime Oasis is a fan-made anime explorer built with Vite and React. It uses TMDB to show anime, movies, and details for popular series.

## Getting Started

### Prerequisites

You'll need a TMDB API key to use this application. Get one for free at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

### Local Development

1. Clone the repository
2. Create a `.env` file in the root directory (see `.env.example` for the template)
3. Add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

4. Install dependencies:

```bash
npm install
```

5. Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:8080/anime-oasis-51/`

## Deployment to GitHub Pages

### Prerequisites

- GitHub repository
- TMDB API key

### Steps

1. Fork or push your code to GitHub
2. Go to your repository **Settings > Secrets and variables > Actions**
3. Click **New repository secret** and add:
   - Name: `VITE_TMDB_API_KEY`
   - Value: Your TMDB API key
4. Go to **Settings > Pages**
5. Set "Source" to "GitHub Actions"
6. Push to the `main` branch - GitHub Actions will automatically build and deploy

The app will be available at: `https://your-username.github.io/anime-oasis-51/`

## Important Security Notes

⚠️ **Do not commit your API key to the repository!**

- `.env` file is in `.gitignore` and won't be committed
- Use GitHub Secrets for production deployments
- The app will gracefully handle missing API keys and show a configuration message

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
