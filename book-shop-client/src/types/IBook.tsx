export interface IBook {
  _id?: string | undefined;
  name: string;
  author: string;
  category: string;
  imageUrl: string;
  description: string;
  price: number;
  quantity: number;
  discount: number;
}
