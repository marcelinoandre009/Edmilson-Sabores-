export type ProductCategory = 
  | 'todos'
  | 'burgers'
  | 'cachorros'
  | 'combos'
  | 'sandes_e_porcoes'
  | 'bebidas';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'burgers' | 'cachorros' | 'combos' | 'sandes_e_porcoes' | 'bebidas';
  description: string;
  ingredients: string[];
  image: string;
  available: boolean;
  badge?: string;
  popular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export type OrderModality = 'delivery' | 'pickup';

export interface DeliveryFormData {
  customerName: string;
  phone: string;
  neighborhood: string;
  address: string;
  reference: string;
  notes: string;
  gpsLocation?: string;
}

export interface PickupFormData {
  customerName: string;
  phone: string;
  pickupTime: string;
  notes: string;
}

export interface ReservationFormData {
  customerName: string;
  phone: string;
  date: string;
  time: string;
  peopleCount: number;
  notes: string;
}
