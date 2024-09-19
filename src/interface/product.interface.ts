

export interface TProduct {
    name: string;
    description: string;
    price: string;
    quantity: number;
    photo: string;
    sold: number;
    status: 'available' | 'unavailable';
    isDeleted: boolean;
    brand: string;
    _id: string;
}