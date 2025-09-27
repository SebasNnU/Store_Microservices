import { DataTypes, Model} from "sequelize";
import { sequelize } from "../config/database";
import { Order } from "@/domain/models/order.model";
import { CreateOrderDto } from "@/domain/models/dtos/create-order.dto";
import { OrderDetailsEntity } from "./order-details.seq-entity";

// Entidad Order
export class OrderEntity
    extends Model<Order, CreateOrderDto>
    implements Order {
    declare id: number;
    declare userId: number;
    declare total: number;
    declare createdAt: Date;
    declare details?: OrderDetailsEntity[];
}

// Inicialización de la entidad Order
OrderEntity.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: "Order",
        tableName: "orders",
        timestamps: false,
    }
);

// Relación uno a muchos entre OrderDetails y Order
OrderEntity.hasMany(OrderDetailsEntity, {
    sourceKey: "id",
    foreignKey: "orderId",
    as: "details"
});
// Relación inversa
OrderDetailsEntity.belongsTo(OrderEntity, {
    foreignKey: "orderId",
    as: "order"
});
