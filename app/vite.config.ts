import path from 'path';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  assetsInclude: [
    "**/*.mp3",
    "**/*.ttf"
  ],
  build: {
    lib: {
      entry: path.resolve("lib", "index.ts"),
      name: 'Blackshell Decipher Game',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      input: {
        main: resolve(__dirname, "lib", "index.ts"),
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        }
      },
    }
  },
});
