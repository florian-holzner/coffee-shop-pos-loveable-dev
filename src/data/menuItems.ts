import { Product, Category } from '../types/pos';

export const products: Product[] = [
  // Espresso based
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    price: 4.50,
    category: 'espresso',
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    price: 4.75,
    category: 'espresso',
  },
  {
    id: 'latte',
    name: 'Latte',
    price: 4.50,
    category: 'espresso',
  },
  {
    id: 'americano',
    name: 'Americano',
    price: 3.50,
    category: 'espresso',
  },
  {
    id: 'espresso-single',
    name: 'Single Espresso',
    price: 3.00,
    category: 'espresso',
  },
  {
    id: 'espresso-double',
    name: 'Double Espresso',
    price: 3.75,
    category: 'espresso',
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    price: 3.75,
    category: 'espresso',
  },
  {
    id: 'mocha',
    name: 'Mocha',
    price: 5.00,
    category: 'espresso',
  },
  
  // Brewed coffee
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    price: 4.25,
    category: 'brewed',
  },
  {
    id: 'batch-brew',
    name: 'Batch Brew',
    price: 3.25,
    category: 'brewed',
  },
  {
    id: 'pour-over',
    name: 'Pour Over',
    price: 4.75,
    category: 'brewed',
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    price: 4.50,
    category: 'brewed',
  },
  
  // Tea
  {
    id: 'black-tea',
    name: 'Black Tea',
    price: 3.50,
    category: 'tea',
  },
  {
    id: 'green-tea',
    name: 'Green Tea',
    price: 3.50,
    category: 'tea',
  },
  {
    id: 'herbal-tea',
    name: 'Herbal Tea',
    price: 3.50,
    category: 'tea',
  },
  {
    id: 'chai-latte',
    name: 'Chai Latte',
    price: 4.50,
    category: 'tea',
  },
  
  // Other beverages
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate',
    price: 4.25,
    category: 'other',
  },
  {
    id: 'iced-tea',
    name: 'Iced Tea',
    price: 3.75,
    category: 'other',
  },
  {
    id: 'lemonade',
    name: 'Lemonade',
    price: 3.50,
    category: 'other',
  },
  {
    id: 'italian-soda',
    name: 'Italian Soda',
    price: 4.00,
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
