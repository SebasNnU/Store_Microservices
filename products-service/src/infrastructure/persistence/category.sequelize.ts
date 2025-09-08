import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

// 1. Definir atributos de la tabla
export interface CategoryAttributes {
  id: number;
  name: string;
  description: string;
}

// 2. Atributos requeridos para creación (id es autoincremental)
export interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}

// 3. Clase del modelo
export class CategorySequelize
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  declare id: number;
  declare name: string;
  declare description: string;
}

// 4. Inicialización del modelo
CategorySequelize.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories",
    timestamps: false,
  }
);
