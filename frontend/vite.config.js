import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


export default {
  resolve: {
    extensions: ['.js', '.jsx'] // Add other extensions if needed
  }
}