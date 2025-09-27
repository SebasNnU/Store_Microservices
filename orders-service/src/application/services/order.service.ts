import { IOrderService } from "@/domain/ports/in/order-service.port";
import { IOrderRepository } from "@/domain/ports/out/order-repository.port";
import { CreateOrderDto } from "@/domain/models/dtos/create-order.dto";
import { Order } from "@/domain/models/order.model";
import { OrderNotFoundError, InvalidTotalError, InvalidUserIdError, InvalidOrderIdError } from "@/domain/exceptions/domain.exception";
import { OrderDetails } from "@/domain/models/order-details.model";

export class OrderService implements IOrderService {
    constructor(private readonly orderRepository: IOrderRepository) { }

    private validateOrderId(id: number) {
        if (id !== undefined && id <= 0)
            throw new InvalidOrderIdError(id);
    }

    private validateUserId(userId: number) {
        if (userId !== undefined && userId <= 0)
            throw new InvalidUserIdError(userId);
    }

    private validateBusinessRules(data: { userId?: number; total?: number }) {
        this.validateUserId(data.userId!);
        if (data.total !== undefined && data.total <= 0)
            throw new InvalidTotalError(data.total);
    }

    async create(dto: CreateOrderDto): Promise<Order> {
        this.validateBusinessRules(dto);
        return await this.orderRepository.create(dto);
    }

    async getAll(): Promise<Order[]> {
        const orders = await this.orderRepository.getAll();
        return orders;
    }

    async getById(id: number): Promise<Order | null> {
        this.validateOrderId(id);
        return await this.orderRepository.getById(id);
    }

    async getByUserId(userId: number): Promise<Order[]> {
        this.validateUserId(userId);
        return await this.orderRepository.getByUserId(userId);
    }

    async getDetailsById(id: number): Promise<OrderDetails | null> {
        this.validateOrderId(id);
        return await this.orderRepository.getDetailsById(id);
    }

    async delete(id: number): Promise<void> {
        const ok = this.orderRepository.delete(id);
        if (!ok) throw new OrderNotFoundError(id);
    }
}