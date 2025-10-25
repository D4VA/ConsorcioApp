import { ProductTemplate } from "./components/templates/ProductTemplate";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header className="flex justify-between p-4 bg-gray-100">
        <h1 className="font-bold text-lg">Consorcio Store</h1>
        <div className="flex flex-row gap-3.5">
          <Link href="/cart" className="text-blue-600 underline hover:underline">
            Ver Carrito
          </Link>
          <Link href="/orders" className="text-blue-600 underline hover:underline">
            Todos los Carritos
          </Link>
        </div>
      </header>
      <ProductTemplate />
    </div>
  );
}
