"use client";

import React, { useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { ProductResult } from "@/types/product";
import { searchProductsManually } from "./searchProducts";

export function ProductSearchManual() {
  const [inputValue, setInputValue] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [results, setResults] = useState<ProductResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    const trimmed = inputValue.trim();

    if (!trimmed) return;

    setSubmittedQuery(trimmed);
    setLoading(true);
    setError(null);

    try {
      const products = await searchProductsManually(trimmed);
      setResults(products);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Unknown error",
      );
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        value={inputValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setInputValue(event.target.value)
        }
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") void handleSearch();
        }}
        placeholder="Search products..."
      />
      <button type="button" onClick={() => void handleSearch()}>
        Search
      </button>

      <p>Submitted query: {submittedQuery}</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && results.length === 0 && submittedQuery && (
        <p>No products found.</p>
      )}

      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
