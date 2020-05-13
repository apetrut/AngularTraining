import { Photo } from './photo';

/* Defines the product entity */
export interface Product {
  id: number;
  productName: string;
  productCode: string;
  tags?: any[];
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
  photos?: Photo[];
}

