import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import visualizer from "rollup-plugin-visualizer"
import { defineConfig } from 'rollup';
import copy from 'rollup-plugin-copy'

export default defineConfig({
    input: 'temp/index.mjs',
    output: {
        exports: 'named',
        format: 'es',
        file: 'dist/index.mjs',
        sourcemap: true,
        inlineDynamicImports: true,
        banner: '/// <reference types="./index.d.ts" />'
    },
    plugins: [
        replace({
            values: {
                'globalScope._pdfjsCompatibilityChecked': true,
                "PDFJSDev.test('GENERIC')": true,
                "PDFJSDev.test('PRODUCTION')": true,
                "PDFJSDev.test('CHROME')": false,
                "PDFJSDev.test('FIREFOX || MOZCENTRAL')": false,
                "PDFJSDev.test('IMAGE_DECODERS')": false,
                "PDFJSDev.test('MOZCENTRAL')": true,
                "PDFJSDev.test('FIREFOX || MOZCENTRAL || GENERIC')": false,
                "PDFJSDev.eval('BUNDLE_VERSION')": '"1.0.0"',
                "PDFJSDev.eval('BUNDLE_BUILD')": '"1"',
                '__non_webpack_require__': 'require',
                'is_node()': 'false',
                "typeof window === 'undefined'": true,
                "typeof window !== 'undefined'": false,
                "typeof ReadableStream !== 'undefined'": true, // skip ReadableStream check
                'isReadableStreamSupported': true,
                "typeof document === 'undefined'": true,
                "typeof document !== 'undefined'": false,
                "typeof Response !== 'undefined' && 'body' in Response.prototype": true,
                "typeof AbortController !== 'undefined'": true,
                "typeof Worker !== 'undefined'": false,
                "typeof navigator !== 'undefined'": false,
                'isURLSupported': true,
                "typeof require.ensure === 'undefined'": false,
                "worker = Promise.resolve().then": 'worker = (function(callback) {return callback();})',
                "typeof requirejs !== 'undefined'": false,
                "PDFJSDev.test('LIB')": false,
                "require(this.workerSrc)": "require('pdfjs/src/pdf.worker.js')",
                "PDFJSDev.test('!PRODUCTION || TESTING')": false,
                "PDFJSDev.test('TESTING && !LIB')": false,
                "PDFJSDev.test('TESTING')": false,
                "PDFJSDev.test('SKIP_BABEL')": true,
                '(isNodeJS()': '(false',
                "apiVersion !== workerVersion": false
            },
            objectGuards: true,
            preventAssignment: true,
            delimiters: ['', '']
        }),
        terser({
            compress: {
                ecma: 7,
                unsafe: true,
                passes: 5,

            },
            output: {
                comments: /^\//,
            },
            module: true,
        }),
        nodeResolve({ browser: true }),
        commonjs(),
        visualizer(),
        copy({
            targets: [
                { src: 'index.d.ts', dest: 'dist/' },
            ]
        })
    ],
}
)