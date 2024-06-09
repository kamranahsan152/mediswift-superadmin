export interface Medicine {
  _id: string;
  Medicinename: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  shops: string[];
  createAt: string;
  Images: { data: { type: string; data: number[] }; contentType: string };
  status: 'Out of Stock' | 'Available'
}