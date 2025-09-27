export interface OrderDetails {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    product?: {
        id: number;
        name: string;
        price: number;
    };
}
