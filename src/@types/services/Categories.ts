import { Product } from "./Product";

export interface Categories {
  id: string;
  name: string;
  products: Product[];
}