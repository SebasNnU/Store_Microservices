import { IOrderRepository } from "@/domain/ports/out/order-repository.port";
import { OrderNotFoundError } from "@/domain/exceptions/domain.exception";
import { Order } from "@/domain/models/order.model";
import { OrderDetails } from "@/domain/models/order-details.model";

export class OrderRepository implements IOrderRepository {
    private orders: Order[] = [];
    private orderDetails: OrderDetails[] = [];
    private currentId = 1;

    async create(order: Omit<Order, "id">): Promise<Order> {
        const newOrder: Order = { id: this.currentId++, ...order };
        this.orders.push(newOrder);
        return newOrder;
    }

    async getAll(): Promise<Order[]> {
        return this.orders;
    }

    async getById(id: number): Promise<Order | null> {
        const order = this.orders.find(o => o.id === id);
        if (!order) throw new OrderNotFoundError(id);
        return order;
    }

    async getByUserId(userId: number): Promise<Order[]> {
        return this.orders.filter(o => o.userId === userId);
    }

    async getDetailsById(id: number): Promise<OrderDetails | null> {
        const details = this.orderDetails.find(d => d.id === id) || null;
        return details;
    }

    async delete(id: number): Promise<boolean> {
        const idx = this.orders.findIndex(o => o.id === id);
        if (idx === -1) return false;
        this.orders.splice(idx, 1);
        return true;
    }
}
