import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
    return {
        plugins: [vue()],
        base: '/tetris/',
        resolve: { alias: { '@': path.resolve(__dirname, './src') } },
        css: { modules: { generateScopedName: mode === 'development' ? '' : '[hash:base64:8]' } },
    };
});
