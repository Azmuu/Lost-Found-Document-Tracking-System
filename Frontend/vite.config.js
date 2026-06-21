import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiPort = env.VITE_API_PORT || '5000'
  const apiTarget = `http://localhost:${apiPort}`

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': apiTarget,
        '/uploads': apiTarget,
      },
    },
  }
})
