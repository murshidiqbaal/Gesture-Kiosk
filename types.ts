
export type Gesture = 'NEXT' | 'SELECT' | 'STOP' | 'NONE';

export enum AppScreen {
  WELCOME = 'WELCOME',
  CATEGORY = 'CATEGORY',
  MENU = 'MENU',
  CART = 'CART',
  CONFIRMATION = 'CONFIRMATION'
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
