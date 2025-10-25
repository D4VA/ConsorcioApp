import { Button } from "./Button";
import { formatCurrency } from "../utils/formatCurrency";
import { useCartStore } from "../store/useCartStore";

interface Props {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export const CartItem = ({ id, title, price, quantity }: Props) => {
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex items-center justify-between border-b py-2">
      <span>{title}</span>
      <span>{formatCurrency(price)} x {quantity}</span>
      <Button variant="danger" onClick={() => removeItem(id)}>
        Eliminar
      </Button>
    </div>
  );
};