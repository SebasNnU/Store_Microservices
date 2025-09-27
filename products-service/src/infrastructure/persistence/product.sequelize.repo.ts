import { IProductRepository } from "@/domain/ports/out/product-repository.port";
import { ProductEntity } from "./product.seq-entity";
import { Product } from "@/domain/models/product.model";
import { CategoryEntity } from "./category.seq-entity";

export class ProductRepository implements IProductRepository {

  async create(product: Omit<Product, "id">): Promise<Product> {
    return await ProductEntity.create(product);
  }

  async getAll(): Promise<Product[]> {
    return await ProductEntity.findAll({
      include: [{ 
        model: CategoryEntity, 
        as: 'category',
        attributes: ['id', 'name', 'description']
      }]
    });
  }

  async update(id: number, data: Partial<Omit<Product, "id">>): Promise<Product|null> {
    await ProductEntity.update(data, { where: { id } });
    const updatedProduct = await ProductEntity.findByPk(id);
    return updatedProduct;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await ProductEntity.destroy({ where: { id } });
    return deleted > 0;
  }
}