import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hospedado em games.gscandelari.com.br/sudoku-pokemon — base e outDir
// refletem esse subcaminho para os assets resolverem corretamente.
export default defineConfig({
  plugins: [react()],
  base: '/sudoku-pokemon/',
  build: {
    outDir: 'public-deploy/sudoku-pokemon',
  },
})
