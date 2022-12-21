import { BasketItem } from "./basketItem";

export interface Basket {
    id: string;
    buyerId: string;
    items: BasketItem[];
}