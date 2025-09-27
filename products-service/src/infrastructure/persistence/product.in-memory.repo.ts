import { IProductRepository } from "@/domain/ports/out/product-repository.port";
import { Product } from "@/domain/models/product.model";
import { ProductNotFoundError } from "@/domain/exceptions/domain.exception";

export class ProductRepository implements IProductRepository {
  private products: Product[] = [];
  private currentId = 1;

  private findIndexById(id: number): number {
    return this.products.findIndex(p => p.id === id);
  }

  async create(product: Omit<Product, "id">): Promise<Product> {
    const newProduct: Product = { id: this.currentId++, ...product };
    this.products.push(newProduct);
    return newProduct;
  }

  async getAll(): Promise<Product[]> {
    return this.products;
  }

  async update(id: number, data: Partial<Omit<Product, "id">>): Promise<Product|null> {
    const idx = this.findIndexById(id);
    if (idx === -1) throw new ProductNotFoundError(id);
    const updated = { ...this.products[idx], ...data } as Product;
    this.products[idx] = updated;
    return updated;
  }

  async delete(id: number): Promise<boolean> {
    const idx = this.findIndexById(id);
    if (idx === -1) return false;
    this.products.splice(idx, 1);
    return true;
  }
}