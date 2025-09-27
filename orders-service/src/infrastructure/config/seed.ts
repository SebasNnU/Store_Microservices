import { OrderEntity } from "../persistence/order.seq-entity";
import { OrderDetailsEntity } from "../persistence/order-details.seq-entity";

export async function seedOrders() {
  await OrderEntity.bulkCreate(
    [
      { userId: 1, total: 150.0 },
      { userId: 2, total: 200.0 },
      { userId: 2, total: 350.0 },
    ],
    { ignoreDuplicates: true }
  );
}

export async function seedOrderDetails() {
  await OrderDetailsEntity.bulkCreate(
    [
      { orderId: 1, productId: 1, quantity: 2},
      { orderId: 1, productId: 2, quantity: 1},
      { orderId: 2, productId: 3, quantity: 4},
      { orderId: 3, productId: 1, quantity: 1},
    ],
    { ignoreDuplicates: true }
  );
}