import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Product } from "@/domain/models/product.model";
import { CreateProductDto } from "@/domain/models/dtos/create-product.dto";
import { CategoryEntity } from "./category.seq-entity";

// Entidad Product
export class ProductEntity
  extends Model<Product, CreateProductDto>
  implements Product {
  declare id: number;
  declare name: string;
  declare price: number;
  declare stock: number;
  declare state: string;
  declare categoryId: number;
  declare category?: CategoryEntity;
}

// Inicialización de la entidad Product
ProductEntity.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: false,
  }
);

// Relación muchos a uno entre Product y Category
ProductEntity.belongsTo(CategoryEntity, {
  foreignKey: 'categoryId',
  as: 'category'
});
// Relación uno a muchos entre Category y Product
CategoryEntity.hasMany(ProductEntity, {
  sourceKey: 'id',
  foreignKey: 'categoryId',
  as: 'products'
});
