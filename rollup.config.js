import path from 'path'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import alias from 'rollup-plugin-alias'
// import resolve from 'rollup-plugin-node-resolve'
import minify from 'minify'
import { name, version, author } from './package.json'

const fromSrc = (...paths) => {
  return path.join(__dirname, 'src', ...paths)
}

const plugins = [
  alias({
    lib: fromSrc('lib')
  }),
  json(),
  commonjs({
    // non-CommonJS modules will be ignored, but you can also
    // specifically include/exclude files

    // if true then uses of `global` won't be dealt with by this plugin
    ignoreGlobal: true, // Default: false

    // if false then skip sourceMap generation for CommonJS modules
    sourceMap: true // Default: true
  }),
/*
  resolve({
    only: [/pleasure-/]
  }),
*/
 // minify()
]

const banner = `/*!
 * ${ name } v${ version }
 * (c) 2018-${ new Date().getFullYear() } ${ author }
 * Released under the MIT License.
 */`

export default [
  {
    input: 'src/pleasure-api-plugin-socket-io.js',
    output: [
      {
        file: 'dist/pleasure-api-plugin-socket-io.js',
        format: 'cjs',
        banner
      },
      {
        file: 'dist/pleasure-api-plugin-socket-io.esm.js',
        format: 'esm',
        banner
      }
    ],
    plugins
  }
]
