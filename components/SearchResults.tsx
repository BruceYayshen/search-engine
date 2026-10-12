"use client";

import { Alert, Empty, Pagination, Spin } from "antd";
import type { ProductResult } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { PAGE_SIZE } from "@/lib/api";

type SearchResultsProps = {
  products: ProductResult[];
  total: number;
  page: number;
  loading: boolean;
  error: Error | null;
  hasSearched: boolean;
  onPageChange: (page: number) => void;
};

export function SearchResults({
  products,
  total,
  page,
  loading,
  error,
  hasSearched,
  onPageChange,
}: SearchResultsProps) {
  if (!hasSearched) {
    return <div className="status"><Empty description="Search for a product to get started." /></div>;
  }

  if (loading && products.length === 0) {
    return <div className="status"><Spin size="large" tip="Searching..." /></div>;
  }

  if (error) {
    return (
      <div className="status">
        <Alert type="error" showIcon message="Unable to load products" description={error.message} />
      </div>
    );
  }

  if (products.length === 0) {
    return <div className="status"><Empty description="No products found." /></div>;
  }

  return (
    <>
      {loading && <div className="status"><Spin size="small" /></div>}

      <div className="results-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {total > PAGE_SIZE && (
        <div className="pagination-row">
          <Pagination
            current={page + 1}
            pageSize={PAGE_SIZE}
            total={total}
            showSizeChanger={false}
            onChange={(nextPage) => onPageChange(nextPage - 1)}
          />
        </div>
      )}
    </>
  );
}
