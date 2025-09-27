import { IOrderRepository } from "@/domain/ports/out/order-repository.port";
import { OrderEntity } from "./order.seq-entity";
import { Order } from "@/domain/models/order.model";
import { OrderDetailsEntity } from "./order-details.seq-entity";
import { OrderDetails } from "@/domain/models/order-details.model";

export class OrderRepository implements IOrderRepository {

    async getAll(): Promise<Order[]> {
        return await OrderEntity.findAll({
            include: [{
                model: OrderDetailsEntity,
                as: 'details'
            }]
        });
    }

    async create(order: Omit<Order, "id">): Promise<Order> {
        return await OrderEntity.create(order);
    }

    async getById(id: number): Promise<Order | null> {
        return await OrderEntity.findByPk(id, {
            include: [{
                model: OrderDetailsEntity,
                as: 'details'
            }
            ]
        });
    }

    async getByUserId(userId: number): Promise<Order[]> {
        return await OrderEntity.findAll({ where: { userId } });
    }

    async getDetailsById(id: number): Promise<OrderDetails | null> {
        return await OrderDetailsEntity.findByPk(id);
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await OrderEntity.destroy({ where: { id } });
        return deleted > 0;
    }
}