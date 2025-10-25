import { ProductCard } from "./ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export const ProductGrid = ({ products }: { products: Product[] }) => (
  <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
    {products.map((p) => (
      <ProductCard key={p.id} {...p} />
    ))}
  </div>
);
