import { OrderDetails } from '@/domain/models/order-details.model';
import { Order } from '../../models/order.model';

/**
 * Puerto de salida para el repositorio de órdenes.
 */
export interface IOrderRepository {
    /**
     * Crea una nueva orden.
     * @param order Datos de la orden sin ID.
     * @returns La orden creada.
     */
    create(order: Omit<Order, "id" | "createdAt">): Promise<Order>;

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
     * @returns `true` si se eliminó, `false` si no existe.
     */
    delete(id: number): Promise<boolean>;
}