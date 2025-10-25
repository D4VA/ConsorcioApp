"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { Button } from "../components/Button";
import { printOrder } from "../utils/printOrder";
import Link from "next/link";

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

interface Coupon {
  code: string;
  type: string;
  discount: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  totalBeforeDiscount: number;
  totalDiscount: number;
  totalAfterDiscount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
  coupon?: Coupon;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/order");
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Cargando órdenes...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <Link href="/" className="text-blue-600 underline hover:underline">
        Ver tienda
      </Link>
      <h1 className="text-2xl font-bold mb-4">Órdenes</h1>
      {orders.length === 0 ? (
        <p>No hay órdenes registradas.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg shadow">
              <p>
                <strong>Cliente:</strong> {order.customerName} (
                {order.customerEmail})
              </p>
              <p>
                <strong>Estado:</strong> {order.status} |{" "}
                <strong>Creado:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              {order.coupon && (
                <p>
                  <strong>Cupón:</strong> {order.coupon.code} (
                  {order.coupon.type} - {order.coupon.discount}%)
                </p>
              )}
              <ul className="mt-2">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.productName} x {item.quantity}
                    </span>
                    <span>{formatCurrency(item.price)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-0.5 mb-2">
                <p className="font-semibold">
                  Descuento: {formatCurrency(order.totalDiscount)}
                </p>
                <p className="font-semibold">
                  Total: {formatCurrency(order.totalAfterDiscount)}
                </p>
              </div>

              <Button onClick={() => printOrder(order)} variant="print">
                Imprimir Pedido
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
