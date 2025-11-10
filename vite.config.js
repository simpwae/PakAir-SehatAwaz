import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync } from "fs";
import { join } from "path";

// Plugin to copy PWA files to dist
const copyPWAFiles = () => {
  return {
    name: "copy-pwa-files",
    closeBundle() {
      try {
        copyFileSync(
          join(__dirname, "public/manifest.json"),
          join(__dirname, "dist/manifest.json")
        );
        copyFileSync(
          join(__dirname, "public/sw.js"),
          join(__dirname, "dist/sw.js")
        );
      } catch (err) {
        console.warn("Failed to copy PWA files:", err);
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), copyPWAFiles()],
  build: {
    // Enable minification and tree-shaking
    // use default esbuild minifier (terser optional)
    target: "es2015",
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
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
  // Performance optimizations
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
});
