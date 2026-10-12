"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, Typography } from "antd";
import { fetchCategories, searchProducts } from "@/lib/api";
import { useDebouncedValue } from "@/lib/useDebouncedValue";
import { SearchBar } from "@/components/SearchBar";
import { SearchResults } from "@/components/SearchResults";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 400;

export function ProductSearch() {
  const [inputValue, setInputValue] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const [liveSearch, setLiveSearch] = useState(false);

  const debouncedInput = useDebouncedValue(inputValue, DEBOUNCE_MS);

  const normalizedSubmittedQuery = submittedQuery.trim();
  const normalizedDebouncedQuery = debouncedInput.trim();

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => fetchCategories(signal),
    staleTime: 10 * 60_000,
  });

  const activeQuery = liveSearch ? normalizedDebouncedQuery : normalizedSubmittedQuery;
  const canSearch = activeQuery.length >= MIN_QUERY_LENGTH;

  const productsQuery = useQuery({
    queryKey: ["products", activeQuery, category, page],
    queryFn: ({ signal }) => searchProducts(activeQuery, category, page, signal),
    enabled: canSearch,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (!liveSearch) return;
    if (normalizedDebouncedQuery.length < MIN_QUERY_LENGTH) return;

    setPage(0);
  }, [liveSearch, normalizedDebouncedQuery]);

  function handleSubmit() {
    const trimmed = inputValue.trim();
    setLiveSearch(false);
    setSubmittedQuery(trimmed);
    setPage(0);
  }

  function handleCategoryChange(nextCategory: string) {
    setCategory(nextCategory);
    setPage(0);
  }

  function enableLiveSearch() {
    setLiveSearch(true);
    setPage(0);
  }

  const hasSearched = canSearch;

  return (
    <>
      <div className="header">
        <Typography.Title level={1}>Thailand 7-11 Product Search</Typography.Title>
        <Typography.Paragraph type="secondary">
          7-11 Thailand has everthing you need! let's begin searching for your favourite products.
        </Typography.Paragraph>
      </div>

      <div className="search-panel">
        <SearchBar
          inputValue={inputValue}
          category={category}
          categories={categoriesQuery.data ?? []}
          onInputChange={setInputValue}
          onCategoryChange={handleCategoryChange}
          onSubmit={handleSubmit}
        />

        <div style={{ marginTop: 12 }}>
          <button type="button" onClick={enableLiveSearch}>
            Enable live search after 400ms of no typing
          </button>
        </div>

        {categoriesQuery.isError && (
          <div style={{ marginTop: 12 }}>
            <Alert type="warning" showIcon message="Categories could not be loaded. Search still works without the category filter." />
          </div>
        )}
      </div>

      <SearchResults
        products={productsQuery.data?.products ?? []}
        total={productsQuery.data?.total ?? 0}
        page={page}
        loading={productsQuery.isFetching}
        error={productsQuery.error instanceof Error ? productsQuery.error : null}
        hasSearched={hasSearched}
        onPageChange={setPage}
      />
    </>
  );
}
