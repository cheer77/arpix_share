import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  base: './',
  root: './',
  clearScreen: false,
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/components'),
    }),
  ],
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        sourceMap: true,
        additionalData: (source, fp) => {
          if (fp.includes('abstracts')) return source;
          return `@use "${resolve(__dirname, 'src/scss/abstracts')}" as *;\n${source}`;
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'product.html'),
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    open: true,
  },
});
