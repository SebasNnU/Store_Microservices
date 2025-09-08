export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number; 
  state: string;
  categoryId: number; 
}

export interface ProductWithCategory extends Omit<Product, "categoryId"> {
  category: { id: number; name: string, description: string };
}
