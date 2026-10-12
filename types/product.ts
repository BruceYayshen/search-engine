export type ApiProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
};

export type ProductSearchResponse = {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductResult = {
  id: number;
  name: string;
  imageUrl: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
};

export type ApiCategory = {
  slug: string;
  name: string;
  url: string;
};

export type Category = ApiCategory;
