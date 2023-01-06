export interface Details{
    productId: number;
    productName: String;
    quantity: number;
}
export interface Order{
    name: String;
    shippingAddress: String;
    city: String;
    date: String;
    isDelivery:boolean;
    id: number;
}

export interface DetailsOrder{
    details: Details[];
    orderId: number;
    
}