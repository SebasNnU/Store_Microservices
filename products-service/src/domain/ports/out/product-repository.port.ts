import { Product } from "@/domain/models/product.model";

/**
 * Puerto de salida para el repositorio de productos.
 */
export interface IProductRepository {
    /**
     * Crea un nuevo producto.
     * @param product Datos del producto sin ID.
     * @returns El producto creado.
     */
    create(product: Omit<Product, "id">): Promise<Product>;

    /**
     * Obtiene todos los productos.
     * @returns Lista de productos.
     */
    getAll(): Promise<Product[]>;

    /**
     * Actualiza un producto existente.
     * @param id ID del producto.
     * @param product Datos a actualizar (parciales, sin ID).
     * @returns El producto actualizado.
     */
    update(id: number, product: Partial<Omit<Product, "id">>): Promise<Product|null>;

    /**
     * Elimina un producto por ID.
     * @param id ID del producto.
     * @returns `true` si se eliminó, `false` si no existe.
     */
    delete(id: number): Promise<boolean>;
}