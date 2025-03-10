import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // @를 src 폴더로 설정
      '@assets': path.resolve(__dirname, 'src/assets'), // @assets를 src/assets 폴더로 설정
      '@components': path.resolve(__dirname, 'src/components'), // @components를 src/components 폴더로 설정
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@context': path.resolve(__dirname, 'src/context'),
    }
  }
})