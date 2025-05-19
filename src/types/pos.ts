
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  modifications?: string[];
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'canceled';
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  items: Product[];
}
