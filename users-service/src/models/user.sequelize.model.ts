import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@/config/database";

// 1. Atributos de la tabla
export interface UserAttributes {
    id: number;
    name: string;
    lastName: string;
    password: string;
}

// 2. Atributos requeridos para crear un User (id es autoincremental)
export interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

// 3. Clase del modelo
export class UserSequelize extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    declare id: number;
    declare name: string;
    declare lastName: string;
    declare password: string;
}

// 4. Inicialización del modelo
UserSequelize.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
        lastName: { type: DataTypes.STRING(100), allowNull: false, unique: true },
        password: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: false,
    }
);