import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Colvert',
      fileName: (format) => `colvert.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External dependencies that shouldn't be bundled
      external: [],
      output: {
        // Global variables to use in the UMD build
        globals: {},
        exports: 'named',
        format: 'cjs',
        preserveModules: false,
        interop: 'auto',
        esModule: true,
        generatedCode: {
          constBindings: true
        }
      },
    },
    minify: 'terser',
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
  },
}); 