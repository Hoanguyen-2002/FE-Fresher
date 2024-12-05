export type TCartItem = {
    id: string;
    title: string;
    imageURL: string;
    quantity: number;
    originalPrice: number;
    salePrice: number;
    note?: string | null
}