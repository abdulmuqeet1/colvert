import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Colvert',
      fileName: (format) => `colvert.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // External dependencies that shouldn't be bundled
      external: [],
      output: {
        // Global variables to use in the UMD build
        globals: {},
      },
    },
    minify: 'terser',
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
  },
}); 