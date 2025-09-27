import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Category } from "@/domain/models/category.model";
import { CreateCategoryDto } from "@/domain/models/dtos/create-category.dto";

// Entidad Category
export class CategoryEntity
  extends Model<Category, CreateCategoryDto>
  implements Category {
  declare id: number;
  declare name: string;
  declare description: string;
}

// Inicialización de la entidad Category
CategoryEntity.init(
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
