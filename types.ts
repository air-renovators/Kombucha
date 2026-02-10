export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  shortDesc: string;
  category: 'kit' | 'drink';
  size?: string;
  description?: string;
  ingredients?: string[];
  features?: string[];
  fermentationNotes?: string;
  storage?: string;
  disclaimer?: string;
  availability?: 'In Stock' | 'Low Stock' | 'Sold Out';
  flavor?: string; // Added for cart context
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FlavorProfile {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  color: string;
  icon: 'utensils' | 'flower' | 'leaf' | 'cup';
}

export type SortOption = 'price-asc' | 'price-desc' | 'name';
export type FilterOption = 'all' | '330ml' | '440ml' | '1L';