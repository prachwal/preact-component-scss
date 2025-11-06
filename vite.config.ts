import { defineConfig } from 'vitest/config'
import preact from '@preact/preset-vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { readFileSync } from 'fs'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    preact(),
    ...(mode === 'library' ? [dts({
      tsconfigPath: './tsconfig.dts.json',
      outDir: 'dist',
      entryRoot: 'src'
    })] : [])
  ],
  root: resolve(__dirname, '.'),
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version)
  },
  css: {
    postcss: {
      plugins: mode === 'production' ? [
        require('cssnano')({
          preset: ['default', {
            discardComments: { removeAll: true },
            normalizeWhitespace: true,
            minifyFontValues: true,
            minifyGradients: true
          }]
        })
      ] : []
    }
  },
  build: {
    outDir: 'dist',
    ...(mode === 'library' && {
      root: resolve(__dirname, '.'),
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'PreactComponentScss',
        fileName: 'index',
        formats: ['es']
      },
      cssCodeSplit: false,
      rollupOptions: {
        external: ['preact', 'preact/hooks', 'preact/jsx-runtime'],
        output: {
          globals: {
            'preact': 'Preact',
            'preact/hooks': 'PreactHooks',
            'preact/jsx-runtime': 'PreactJsxRuntime'
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') {
              return 'index.css'
            }
            return assetInfo.name || 'assets/[name].[ext]'
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
}))
