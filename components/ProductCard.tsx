import { Card, Rate, Tag } from "antd";
import type { ProductResult } from "@/types/product";

type ProductCardProps = {
  product: ProductResult;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="product-card" hoverable>
      <img className="product-image" src={product.imageUrl} alt={product.name} />
      <div className="product-name">{product.name}</div>
      <Tag>{product.category}</Tag>
      <div className="price">${product.price.toFixed(2)}</div>
      <div className="product-meta">Stock: {product.stock}</div>
      <div className="product-meta">
        <Rate disabled allowHalf value={product.rating} /> {product.rating.toFixed(1)}
      </div>
    </Card>
  );
}
