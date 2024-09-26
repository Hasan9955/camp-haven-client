

export interface TProduct {
    name: string;
    description: string;
    price: number;
    quantity: number;
    photo: string;
    category: string;
    sold: number;
    status: 'available' | 'unavailable';
    isDeleted: boolean;
    isRecommended: boolean;
    brand: string;
    _id: string;
}