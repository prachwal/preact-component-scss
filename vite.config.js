import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite';
import { resolve } from 'path';
// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [preact()],
    root: resolve(__dirname, '.'),
    base: process.env.VITE_BASE_PATH || '/',
    build: {
        outDir: 'dist',
        ...(mode === 'library' && {
            lib: {
                entry: resolve(__dirname, 'src/index.ts'),
                name: 'PreactComponentScss',
                fileName: 'index',
                formats: ['es']
            },
            rollupOptions: {
                external: ['preact', 'preact/hooks', 'preact/jsx-runtime'],
                output: {
                    globals: {
                        'preact': 'Preact',
                        'preact/hooks': 'PreactHooks',
                        'preact/jsx-runtime': 'PreactJsxRuntime'
                    }
                }
            }
        })
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        globals: true,
        exclude: ['**/dist/**', '**/node_modules/**'],
    },
}));
