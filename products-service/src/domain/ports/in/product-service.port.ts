import { Product, ProductWithCategory } from "@/domain/models/product.model";
import { CreateProductDto } from "@/domain/models/dtos/create-product.dto";
import { UpdateProductDto } from "@/domain/models/dtos/update-product.dto";

/**
 * Puerto de entrada para la lógica de productos.
 */
export interface IProductService {
    /**
     * Crea un nuevo producto.
     * @param dto Datos para crear el producto.
     * @returns El producto creado.
     */
    create(dto: CreateProductDto): Promise<Product>;

    /**
     * Obtiene todos los productos con su categoría.
     * @returns Lista de productos con categoría.
     */
    getAll(): Promise<ProductWithCategory[]>;

    /**
     * Actualiza un producto existente.
     * @param id ID del producto.
     * @param dto Datos a actualizar.
     * @returns El producto actualizado.
     */
    update(id: number, dto: UpdateProductDto): Promise<Product|null>;

    /**
     * Elimina un producto por ID.
     * @param id ID del producto.
     */
    delete(id: number): Promise<void>;
}