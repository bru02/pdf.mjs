# Pdf.mjs

![License: MIT](https://img.shields.io/npm/l/pdf.mjs)
![Types](https://img.shields.io/badge/types-included-blue)
![npm](https://img.shields.io/npm/v/pdf.mjs)
![npm bundle size](https://img.shields.io/bundlephobia/min/pdf.mjs)

[PDF.js](https://github.com/mozilla/pdf.js) custom-compiled for nodeless, serverless enviroments, like [Deno Deploy](https://deno.com/deploy) and [Cloudflare Workers](https://workers.cloudflare.com).
Rocking in at just under 700kb uncompressed.

## Installation

```sh
npm i pdf.mjs
# or
yarn add pdf.mjs
```

## Examples

### Deno

```ts
import { getDocument } from 'https://cdn.skypack.dev/pdf.mjs?dts'

const data = Deno.readFileSync('./file.pdf')
const doc = await getDocument(data).promise

console.log(await doc.getMetadata())

for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const textContent = await page.getTextContent()
    const contents = textContent.items.map((item) => item.str).join(' ')
    console.log(contents)
}
```

### Cloudflare Workers

```ts
import { getDocument } from 'pdf.mjs'

export default {
    async fetch(request) {
        const url = new URL(request.url).searchParams.get('pdf')

        if(!url)
            return new Response('400: Bad request',{
                status: 400
            })

        const buff = await fetch(url).then(r => r.arrayBuffer())

        // Note: passing an url to getDocument is not supported on workers
        const doc = await getDocument(buff).promise

        const meta = await doc.getMetadata()
        const pages = []

        for (let i = 1; i <= doc.numPages; i++) {
            const page = await doc.getPage(i)
            const textContent = await page.getTextContent()
            const contents = textContent.items.map((item) => item.str).join(' ')
            pages.push(contents)
        }

        return new Response(JSON.stringify({
            meta,
            pages
        }, null, 2), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}
```

## How?

Two things:

- By removing all polyfills, & some rendering logic bundled into PDF.js
- Using an older version of PDF.js (v2.0.943), without XFA form support, saving about 300kb
