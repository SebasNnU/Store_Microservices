import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { OrderDetails } from "@/domain/models/order-details.model";
import { CreateOrderDetailsDto } from "@/domain/models/dtos/create-order-details.dto";

// Entidad OrderDetails
export class OrderDetailsEntity
    extends Model<OrderDetails, CreateOrderDetailsDto>
    implements OrderDetails {
    declare id: number;
    declare orderId: number;
    declare productId: number;
    declare quantity: number;
}

// Inicialización de la entidad OrderDetails
OrderDetailsEntity.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        orderId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        tableName: "order_details",
        sequelize,
        timestamps: false,
    }
);