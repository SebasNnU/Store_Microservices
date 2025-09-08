import { IProductRepository } from "@/domain/ports/out/product-repository.port";
import { ProductSequelize } from "./product.sequelize";
import { Product } from "@/domain/models/product.model";

export class ProductRepository implements IProductRepository {

  async create(product: Omit<Product, "id">): Promise<Product> {
    return await ProductSequelize.create(product);
  }

  async getAll(): Promise<Product[]> {
    return await ProductSequelize.findAll();
  }

  async update(id: number, data: Partial<Omit<Product, "id">>): Promise<Product|null> {
    await ProductSequelize.update(data, { where: { id } });
    const updatedProduct = await ProductSequelize.findByPk(id);
    return updatedProduct;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await ProductSequelize.destroy({ where: { id } });
    return deleted > 0;
  }
}