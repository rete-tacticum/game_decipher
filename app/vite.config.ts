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
      entry: path.resolve("lib", "index.tsx"),
      name: 'Blackshell Decipher Game',
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, "lib", "index.tsx"),
      },
    }
  },
});
