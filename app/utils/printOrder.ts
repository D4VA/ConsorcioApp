import { Order } from "../orders/page";
import { formatCurrency } from "./formatCurrency";

export const printOrder = (order: Order) => {
  const printWindow = window.open("", "_blank", "width=800,height=600");
  if (!printWindow) return;

  const orderHtml = `
    <html>
      <head>
        <title>Pedido #${order.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { font-size: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background-color: #f2f2f2; }
          strong { display: inline-block; width: 150px; }
        </style>
      </head>
      <body>
        <h1>Pedido #${order.id}</h1>
        <p><strong>Cliente:</strong> ${order.customerName} (${
    order.customerEmail
  })</p>
        <p><strong>Estado:</strong> ${order.status}</p>
        <p><strong>Creado:</strong> ${new Date(
          order.createdAt
        ).toLocaleString()}</p>
        ${
          order.coupon
            ? `<p><strong>Cupón:</strong> ${order.coupon.code} (${order.coupon.type} - ${order.coupon.discount}%)</p>`
            : ""
        }
        <h2>Productos</h2>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
              .map(
                (item) => `
              <tr>
                <td>${item.productName}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.price)}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
        <p><strong>Total a pagar:</strong> ${formatCurrency(
          order.totalAfterDiscount
        )}</p>
      </body>
    </html>
  `;

  printWindow.document.write(orderHtml);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};
