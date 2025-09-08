import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

// 1. Atributos de la tabla
export interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  stock: number;
  state: string;
  categoryId: number;
}

// 2. Atributos requeridos para crear un Product (id es autoincremental)
export interface ProductCreationAttributes
  extends Optional<ProductAttributes, "id"> { }

// 3. Clase del modelo
export class ProductSequelize
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes {
  declare id: number;
  declare name: string;
  declare price: number;
  declare stock: number;
  declare state: string;
  declare categoryId: number;
}

// 4. Inicialización del modelo
ProductSequelize.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
