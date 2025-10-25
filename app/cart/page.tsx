"use client";

import { useCartStore } from "@/app/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useState } from "react";
import axios from "axios";
import { formatCurrency } from "@/app/utils/formatCurrency";

export default function CartPage() {
  const { items, removeItem, total, clearCart, addItem } = useCartStore();
  const [coupon, setCoupon] = useState("");

  const handleConfirm = async () => {
    try {
      const response = await axios.post("https://consorcioapi.onrender.com/api/order", {
        customerName: "Brandon",
        customerEmail: "Brandon@example.com",
        items: items.map((i) => ({
          productId: i.id,
          productName: i.title,
          price: i.price,
          quantity: i.quantity,
        })),
        couponCode: coupon || undefined,
      });

      const order = response.data;

      const message =
        order.totalBeforeDiscount !== order.totalAfterDiscount ? `El total con tu descuento es de: ${order.totalAfterDiscount}` : `El total es de:${order.totalBeforeDiscount}`;

      alert(message);
      clearCart();
    } catch {
      alert("Error al confirmar el pedido");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Tu carrito</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={121}
                  height={160}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <p className="text-gray-600">Cantidad: {item.quantity}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Button onClick={() => removeItem(item.id)} variant="danger">
                  Eliminar
                </Button>
                <Button onClick={() => addItem(item)}>Añadir</Button>
              </div>
            </div>
          ))}
          <div className="mt-4 flex gap-2">
            <Input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Código de descuento"
            />
            <Button onClick={handleConfirm}>Confirmar pedido</Button>
          </div>
          <div className="text-right font-semibold text-lg mt-4">
            Total: {formatCurrency(total())}
          </div>
        </div>
      )}

      <Link href="/" className="text-blue-600 hover:underline">
        Volver a la tienda
      </Link>
    </div>
  );
}
