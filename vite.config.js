import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/constants/_colors.scss";
          @import "@/styles/constants/_breakpoints.scss";
          @import "@/styles/constants/_sizes.scss";
        `
      }
    }
  }
})
