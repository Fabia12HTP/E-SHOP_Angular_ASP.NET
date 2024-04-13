import { Shoes } from './shoes'; 
import { ShoeDetails } from './shoe-details'; 

export interface ShoesCombine extends Shoes, ShoeDetails {
  name: string;
  urlPicture: string;
  description: string;
  price: number;
  rating: number;
  discount: number;
  deliveringState: boolean;
}
