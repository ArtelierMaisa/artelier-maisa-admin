import { Uri } from "./Uri";

export interface Product {
    id: string;
    name: string;
    description: string;
    isOcult: boolean;
    price: number;
    uri: Uri[];
    material: string;
    size: string;
    weight: number;
    whatsapp: string;
}