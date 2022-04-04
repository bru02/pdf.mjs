import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace';
import visualizer from "rollup-plugin-visualizer"
import { defineConfig } from 'rollup';

export default defineConfig({
    input: 'index.js',
    output: {
        exports: 'named',
        format: 'es',
        file: 'temp/index.mjs',
        sourcemap: true,
        inlineDynamicImports: true,
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
                'PDFJSDev.test("SKIP_BABEL")': true,
                'PDFJSDev.test("!PRODUCTION || TESTING")': false,
                "PDFJSDev.test('!PRODUCTION || GENERIC')": false,
                "PDFJSDev.test('!PRODUCTION || TESTING')": false,
"typeof PDFJSDev === 'undefined'":false,            "typeof process === 'object'": "false",
                '__non_webpack_require__': 'require',
                'isNodeJS)': 'false)',
                '(isNodeJS()': '(false',
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
                "typeof URL === 'function'": false, // skip URL check
                "typeof Buffer !== 'undefined'": false,
                'isURLSupported': true,
                "PDFJSDev.test('LIB')": false,
                "eval('require')": "require",
                "require('./pdf.worker.js')": "import('pdfjs/src/pdf.worker.js')",
                'typeof PDFJSDev === "undefined"': false,
                "PDFJSDev.test('SKIP_BABEL')": true,
                "PDFJSDev.test('TESTING')": false,
                "typeof require === 'function'": true,
                "PDFJSDev.test('GENERIC || CHROME')": false, // set to true for remote pdfs
                "GlobalWorkerOptions.workerSrc": true,
                "params.useWorkerFetch": true,
                "typeof requirejs !== 'undefined'": false,
                "typeof PDFJSDev !== 'undefined'": true,
                "require.ensure(": "(function(a,b){b()})("
            },
            objectGuards: true,
            preventAssignment: true,
            delimiters: ['', '']
        }),
        nodeResolve({ browser: true }),
        commonjs(),
        visualizer(),  
    ],
})