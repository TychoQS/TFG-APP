import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/inference_model',
          dest: 'inference_model'
        },
        {
          src: 'node_modules/onnxruntime-web/dist/*',
          dest: '.'
        }
      ]
    })
  ]
})