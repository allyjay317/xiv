import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/// <reference types="vite/client" />
/// <reference types="@emotion/react/types/css-prop" />

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: '@emotion/react',
    babel: {
      plugins: ["@emotion/babel-plugin"]
    }
  })],
  
})
