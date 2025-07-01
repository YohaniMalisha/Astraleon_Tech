import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': {
      VITE_EMAILJS_SERVICE_ID: JSON.stringify(process.env.VITE_EMAILJS_SERVICE_ID),
      VITE_EMAILJS_TEMPLATE_ID: JSON.stringify(process.env.VITE_EMAILJS_TEMPLATE_ID),
      VITE_EMAILJS_PUBLIC_KEY: JSON.stringify(process.env.VITE_EMAILJS_PUBLIC_KEY),
      ...(mode === 'development' ? {
        VITE_DEV_MODE: JSON.stringify(true)
      } : {})
    }
  },
  optimizeDeps: {
    include: ['@emailjs/browser']
  },
  build: {
    target: 'esnext',
    sourcemap: mode === 'development',
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress specific warnings if needed
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
        warn(warning)
      }
    }
  }
}));