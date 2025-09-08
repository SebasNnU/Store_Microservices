import { CategorySequelize } from "../persistence/category.sequelize";

export async function seedCategories() {
  await CategorySequelize.bulkCreate(
    [
      { id: 1, name: "Electronics", description: "Devices and gadgets" },
      { id: 2, name: "Books", description: "All kinds of books" },
      { id: 3, name: "Clothing", description: "Men and women apparel" },
    ],
    { ignoreDuplicates: true }
  );
}
