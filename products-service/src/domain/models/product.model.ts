import { Category } from "./category.model";

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number; 
  state: string;
  categoryId: number;
  category?: Category;
}

export interface ProductWithCategory extends Omit<Product, "categoryId"> {
  category: Category;
}
