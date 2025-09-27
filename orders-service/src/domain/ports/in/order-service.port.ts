import { Order } from '../../models/order.model';
import { CreateOrderDto } from '../../models/dtos/create-order.dto';
import { OrderDetails } from '@/domain/models/order-details.model';

/**
 * Puerto de entrada para la lógica de órdenes.
 */
export interface IOrderService {
    /**
     * Crea una nueva orden.
     * @param dto Datos para crear la orden.
     * @returns La orden creada.
     */
    create(dto: CreateOrderDto): Promise<Order>;

    /**
     * Obtiene todas las órdenes.
     * @returns Lista de órdenes.
     */
    getAll(): Promise<Order[]>;

    /**
     * Obtiene una orden por su ID.
     * @param id ID de la orden.
     * @returns La orden encontrada o `null` si no existe.
     */
    getById(id: number): Promise<Order | null>;

    /**
     * Obtiene todos las ordenes de un usuario por su ID.
     * @param userId ID del usuario.
     * @returns Lista de órdenes del usuario.
     */
    getByUserId(userId: number): Promise<Order[]>;

    /**
     * Obtiene los detalles de una orden por su ID.
     * @param id ID de la orden.
     * @returns La orden con sus detalles o `null` si no existe.
     */
    getDetailsById(id: number): Promise<OrderDetails | null>;

    /**
     * Elimina una orden por su ID.
     * @param id ID de la orden.
     */
    delete(id: number): Promise<void>;
}   