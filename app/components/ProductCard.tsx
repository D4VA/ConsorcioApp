import { ProductImage } from "./ProductImage";
import { Button } from "./Button";
import { formatCurrency } from "../utils/formatCurrency";
import { useCartStore } from "../store/useCartStore";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export const ProductCard = ({ id, title, price, image }: Product) => {
  const addItem = useCartStore((s) => s.addItem);

  const safeImage =
    typeof image === "string" && image.length > 0 ? image : "/placeholder.png";

  return (
    <div key={id.toString()} className="border rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col items-center">
      <ProductImage src={safeImage} alt={title} />
      <h2 className="font-semibold text-sm mt-2 text-center">{title}</h2>
      <p className="text-gray-600 text-sm">{formatCurrency(price)}</p>
      <Button
        onClick={() =>
          addItem({ id, title, price, image: safeImage, quantity: 1 })
        }
      >
        Añadir al carrito
      </Button>
    </div>
  );
};