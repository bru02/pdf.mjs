# Pdf.mjs

![npm](https://img.shields.io/npm/v/pdf.mjs)
![npm bundle size](https://img.shields.io/bundlephobia/min/pdf.mjs)
![License: MIT](https://img.shields.io/npm/l/pdf.mjs)

[PDF.js](https://github.com/mozilla/pdf.js) custom-compiled for nodeless, serverless enviroments, like [Deno Deploy](https://deno.com/deploy), or [Cloudflare Workers](https://workers.cloudflare.com).
Rocking in at just under 700kb uncompressed.

## Installation

## How?

Two things:

- By removing all polyfills, & some rendering logic bundled into PDF.js
- Using an older version of PDF.js (v2.0.943), without XFA form support, saving about 300kb
