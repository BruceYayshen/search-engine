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

Open http://localhost:3000/search

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
```

## 4. Assignment mapping

- Parts 1–8: manual React concepts and request lifecycle
- Parts 9–11: TanStack Query
- Part 12: debounce/live search
- Part 13: query normalization
- Part 14: AbortSignal request cancellation
- Part 15: caching/staleTime
- Part 16: API-side limit + pagination
- Part 17: NEXT_PUBLIC_PRODUCT_API_BASE_URL

## Important learning note

The final app uses TanStack Query because Parts 9–17 ask for it. The `manual-version` folder is kept separately so you can first understand what TanStack Query replaces.
