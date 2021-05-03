import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import mix, { vercelAdapter } from 'vite-plugin-mix'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  plugins: [
    reactRefresh(),
    WindiCSS(),
    mix({
      handler: './handler.js',
      adapter: vercelAdapter(),
    }),
  ],
})
