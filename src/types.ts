export interface TranslatedText {
  ru: string;
  ky: string;
  en: string;
}

export type Language = 'ru' | 'ky' | 'en';

export interface Dish {
  id: string;
  name: TranslatedText;
  description: TranslatedText;
  price: number; // Price in KGS (Kyrgyz Som)
  category: 'breakfast' | 'main' | 'drink' | 'dessert';
  image: string;
  isPopular?: boolean;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface OrderDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  paymentMethod: 'cash' | 'card';
  notes?: string;
}
