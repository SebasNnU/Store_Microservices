import { IProductService } from "@/domain/ports/in/product-service.port";
import { IProductRepository } from "@/domain/ports/out/product-repository.port";
import { CreateProductDto } from "@/domain/models/dtos/create-product.dto";
import { UpdateProductDto } from "@/domain/models/dtos/update-product.dto";
import { Product, ProductWithCategory } from "@/domain/models/product.model";
import { CategoryNotFoundError, InvalidPriceError, InvalidStockError, ProductNotFoundError } from "@/domain/exceptions/domain.exception";

// Simulación de categorías (debería venir de un repositorio real)
import { categories } from "@/domain/mocks/category.mock";

export class ProductService implements IProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  private validateBusinessRules(data: { price?: number; stock?: number; categoryId?: number }) {
    if (data.price !== undefined && data.price <= 0)
      throw new InvalidPriceError(data.price);
    if (data.stock !== undefined && data.stock < 0)
      throw new InvalidStockError(data.stock);
    if (data.categoryId !== undefined && !categories.find(c => c.id === data.categoryId))
      throw new CategoryNotFoundError(data.categoryId);
  }

  async create(dto: CreateProductDto): Promise<Product> {
    this.validateBusinessRules(dto);
    return await this.productRepository.create(dto);
  }

  async getAll(): Promise<ProductWithCategory[]> {
    const products = await this.productRepository.getAll();
    return products.map(p => {
      const category = categories.find(c => c.id === p.categoryId)!;
      return {
        id: p.id,
        name: p.name,
        price: p.price,
        stock: p.stock,
        state: p.state,
        category: category
          ? { id: category.id, name: category.name, description: category.description }
          : { id: 0, name: "Sin categoría", description: "" },
      };
    });
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product|null> {
    this.validateBusinessRules(dto);
    return await this.productRepository.update(id, dto);
  }

  async delete(id: number): Promise<void> {
    const ok = this.productRepository.delete(id);
    if (!ok) throw new ProductNotFoundError(id);
  }
}