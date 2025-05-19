
import { Product, Category } from '../types/pos';

export const products: Product[] = [
  // Espresso based
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    price: 9.00,
    category: 'espresso',
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    price: 9.50,
    category: 'espresso',
  },
  {
    id: 'latte',
    name: 'Latte',
    price: 9.00,
    category: 'espresso',
  },
  {
    id: 'americano',
    name: 'Americano',
    price: 7.00,
    category: 'espresso',
  },
  {
    id: 'espresso-single',
    name: 'Single Espresso',
    price: 6.00,
    category: 'espresso',
  },
  {
    id: 'espresso-double',
    name: 'Double Espresso',
    price: 7.50,
    category: 'espresso',
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    price: 7.50,
    category: 'espresso',
  },
  {
    id: 'mocha',
    name: 'Mocha',
    price: 10.00,
    category: 'espresso',
  },
  
  // Brewed coffee
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    price: 8.50,
    category: 'brewed',
  },
  {
    id: 'batch-brew',
    name: 'Batch Brew',
    price: 6.50,
    category: 'brewed',
  },
  {
    id: 'pour-over',
    name: 'Pour Over',
    price: 9.50,
    category: 'brewed',
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    price: 9.00,
    category: 'brewed',
  },
  
  // Tea
  {
    id: 'black-tea',
    name: 'Black Tea',
    price: 7.00,
    category: 'tea',
  },
  {
    id: 'green-tea',
    name: 'Green Tea',
    price: 7.00,
    category: 'tea',
  },
  {
    id: 'herbal-tea',
    name: 'Herbal Tea',
    price: 7.00,
    category: 'tea',
  },
  {
    id: 'chai-latte',
    name: 'Chai Latte',
    price: 9.00,
    category: 'tea',
  },
  
  // Other beverages
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate',
    price: 8.50,
    category: 'other',
  },
  {
    id: 'iced-tea',
    name: 'Iced Tea',
    price: 7.50,
    category: 'other',
  },
  {
    id: 'lemonade',
    name: 'Lemonade',
    price: 7.00,
    category: 'other',
  },
  {
    id: 'italian-soda',
    name: 'Italian Soda',
    price: 8.00,
    category: 'other',
  },
];

export const categories: Category[] = [
  {
    id: 'espresso',
    name: 'Espresso Drinks',
    items: products.filter(product => product.category === 'espresso'),
  },
  {
    id: 'brewed',
    name: 'Brewed Coffee',
    items: products.filter(product => product.category === 'brewed'),
  },
  {
    id: 'tea',
    name: 'Tea',
    items: products.filter(product => product.category === 'tea'),
  },
  {
    id: 'other',
    name: 'Other Drinks',
    items: products.filter(product => product.category === 'other'),
  },
];
