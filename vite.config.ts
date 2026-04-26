import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
    vite: {
        // GitHub Pages base path
        base: "/anime-oasis-51/",
        define: {
            // Enable SPA mode for static hosting
            'process.env.TANSTACK_ROUTER_SPA': 'true',
        },
        build: {
            // Force SPA build for GitHub Pages
            ssr: false,
            // Output directory for the build
            outDir: 'dist/client',
            // Ensure assets are in the correct path
            rollupOptions: {
                input: 'public/index.html',
            },
        },
    },
});