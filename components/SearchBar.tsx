"use client";

import { Button, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { Category } from "@/types/product";

type SearchBarProps = {
  inputValue: string;
  category: string;
  categories: Category[];
  onInputChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSubmit: () => void;
};

export function SearchBar({
  inputValue,
  category,
  categories,
  onInputChange,
  onCategoryChange,
  onSubmit,
}: SearchBarProps) {
  return (
    <div className="search-row">
      <Input
        size="large"
        value={inputValue}
        placeholder="Search products..."
        allowClear
        onChange={(event) => onInputChange(event.target.value)}
        onPressEnter={onSubmit}
      />

      <Select
        size="large"
        value={category || undefined}
        placeholder="All categories"
        allowClear
        style={{ width: "100%" }}
        onChange={(value: string | undefined) => onCategoryChange(value ?? "")}
        options={categories.map((item) => ({
          value: item.slug,
          label: item.name,
        }))}
      />

      <Button
        type="primary"
        size="large"
        icon={<SearchOutlined />}
        onClick={onSubmit}
      >
        Search
      </Button>
    </div>
  );
}
