/**
 * @type {import('rollup').RollupOptions}
 */
import { swc } from 'rollup-plugin-swc3';

export default [
  {
    input: './src/index.ts',
    plugins: [
      swc({
        minify: true,
        include: 'src/**/*.ts',
        jsc: {
          minify: {
            mangle: {
              reserved: ['BrightJs']
            }
          }
        }
      })
    ],
    output: {
        file: './lib/bright.min.js',
        format: 'iife',
        name: 'brightJs',
        compact: true
    }
  },
  {
    input: './src/index.ts',
    plugins: [
      swc({
        minify: false,
        include: 'src/**/*.ts'
      })
    ],
    output: {
        file: './lib/bright.js',
        format: 'iife',
        name: 'brightJs',
        compact: false
    }
  }
]