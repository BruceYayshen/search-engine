import type { ApiProduct, ProductResult, ProductSearchResponse } from "@/types/product";

const API_BASE_URL = process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL ?? "https://dummyjson.com";

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

export async function searchProductsManually(query: string): Promise<ProductResult[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const response = await fetch(
    `${API_BASE_URL}/products/search?q=${encodeURIComponent(trimmedQuery)}`,
  );

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  const data = (await response.json()) as ProductSearchResponse;
  return data.products.map(toProductResult);
}
