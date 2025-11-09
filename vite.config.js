import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Enable minification and tree-shaking
    minify: "terser",
    target: "es2015",
    sourcemap: false,
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          leaflet: ["leaflet"],
        },
      },
    },
  },
  // Optimize dev server
  server: {
    port: 3001,
    strictPort: true,
    host: true,
  },
});
