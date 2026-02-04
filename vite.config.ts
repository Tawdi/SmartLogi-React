import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': '/src',
            '@components': '/src/components',
            '@layouts': '/src/components/layout',
            '@contexts': '/src/contexts',
            '@pages': '/src/pages',
            '@hooks': '/src/hooks',
            '@utils': '/src/utils',
        },
    },


})
