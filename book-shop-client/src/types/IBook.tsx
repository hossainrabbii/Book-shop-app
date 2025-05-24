export interface IBook {
  _id?: string | undefined;
  name: string;
  author: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  discount: number;
}
