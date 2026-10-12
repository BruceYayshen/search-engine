import type {
  ApiCategory,
  ApiProduct,
  Category,
  ProductResult,
  ProductSearchResponse,
} from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL ?? "https://dummyjson.com";

const PAGE_SIZE = 20;

function toProductResult(product: ApiProduct): ProductResult {
  return {
    id: product.id,
    name: product.title,
    imageUrl: product.thumbnail,
    category: product.category,
    price: product.price,
    rating: product.rating,
    stock: product.stock,
  };
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Product API request failed (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export async function fetchCategories(signal?: AbortSignal): Promise<Category[]> {
  const response = await fetchJson<ApiCategory[]>(
    `${API_BASE_URL}/products/categories`,
    signal,
  );

  return response;
}

export async function searchProducts(
  query: string,
  category: string,
  page: number,
  signal?: AbortSignal,
): Promise<{ products: ProductResult[]; total: number }> {
  const skip = page * PAGE_SIZE;
  const trimmedQuery = query.trim();

  if (category) {
    // DummyJSON supports category-side filtering. We then apply the text
    // search locally to the returned category page.
    const categoryUrl = `${API_BASE_URL}/products/category/${encodeURIComponent(
      category,
    )}?limit=${PAGE_SIZE}&skip=${skip}`;

    const response = await fetchJson<ProductSearchResponse>(categoryUrl, signal);
    const normalizedQuery = trimmedQuery.toLowerCase();

    const filtered = response.products.filter((product) =>
      `${product.title} ${product.description}`.toLowerCase().includes(normalizedQuery),
    );

    return {
      products: filtered.map(toProductResult),
      total: response.total,
    };
  }

  const url = `${API_BASE_URL}/products/search?q=${encodeURIComponent(
    trimmedQuery,
  )}&limit=${PAGE_SIZE}&skip=${skip}`;

  const response = await fetchJson<ProductSearchResponse>(url, signal);

  return {
    products: response.products.map(toProductResult),
    total: response.total,
  };
}

export { PAGE_SIZE };
