export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  state: string;
  categoryId: number;
}
