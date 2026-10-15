# Product Search — React + Next.js + TanStack Query

This project follows the uploaded assignment progressively.

## 1. Create the project

```bash
npx create-next-app@latest product-search-next --ts --eslint --app --use-npm
cd product-search-next
npm install antd @ant-design/icons @ant-design/nextjs-registry @tanstack/react-query
```

Or use the supplied files in this folder and run:

```bash
npm install
npm run dev
```

Open https://search-engine-gold-one.vercel.app/

## 2. Environment variable

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

The public API base URL is intentionally public because it is used by browser-side code. Never put a secret API key in a `NEXT_PUBLIC_` variable.

## 3. Main files

```text
app/
  layout.tsx          Next.js root layout + providers
  page.tsx            home page
  providers.tsx       TanStack Query provider
  search/page.tsx     /search route
  globals.css         application styling

components/
  ProductSearch.tsx   main client-side search logic
  SearchBar.tsx       controlled input + category selector
  SearchResults.tsx   loading/error/empty/results UI
  ProductCard.tsx     one product card

lib/
  api.ts              API requests + API-to-UI transformation
  useDebouncedValue.ts debounce hook

types/
  product.ts          API and frontend TypeScript models

manual-version/
  ProductSearchManual.tsx
  searchProducts.ts   manual fetch/useState version for comparison
  