import { CategoryEntity } from "../persistence/category.seq-entity";
import { ProductEntity } from "../persistence/product.seq-entity";

export async function seedCategories() {
  await CategoryEntity.bulkCreate(
    [
      { name: "Electronics", description: "Devices and gadgets" },
      { name: "Books", description: "All kinds of books" },
      { name: "Clothing", description: "Men and women apparel" },
    ],
    { ignoreDuplicates: true }
  );
}

export async function seedProducts() {
  const categories = await CategoryEntity.findAll();
  if (categories.length === 0) {
    throw new Error("No categories found. Please seed categories first.");
  }
  const electronicsCategory = categories.find(c => c.name === "Electronics");
  const booksCategory = categories.find(c => c.name === "Books");
  const clothingCategory = categories.find(c => c.name === "Clothing");
  if (!electronicsCategory || !booksCategory || !clothingCategory) {
    throw new Error("Required categories not found.");
  }
  ProductEntity.bulkCreate(
    [
      {
        name: "Smartphone",
        price: 699.99,
        stock: 50,
        state: "available",
        categoryId: electronicsCategory.id,
      },
      {
        name: "Laptop",
        price: 1299.99,
        stock: 30,
        state: "available",
        categoryId: electronicsCategory.id,
      },
      {
        name: "Novel",
        price: 19.99,
        stock: 100,
        state: "available",
        categoryId: booksCategory.id,
      },
    ],
    { ignoreDuplicates: true }
  );
}