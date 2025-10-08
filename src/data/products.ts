export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'men' | 'women' | 'accessories';
  subcategory: string;
  sizes?: string[];
  colors?: string[];
  featured?: boolean;
  sale?: boolean;
  salePrice?: number;
}

import mensShirt from '@/assets/products/mens-shirt.jpg';
import eveningDress from '@/assets/products/evening-dress.jpg';
import chinos from '@/assets/products/chinos.jpg';
import leatherBag from '@/assets/products/leather-bag.jpg';
import cashmereSweater from '@/assets/products/cashmere-sweater.jpg';
import tailoredBlazer from '@/assets/products/tailored-blazer.jpg';
import linenPants from '@/assets/products/linen-pants.jpg';
import minimalistWatch from '@/assets/products/minimalist-watch.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Cotton Shirt',
    description: 'Premium cotton shirt with modern fit',
    price: 89.99,
    image: mensShirt,
    category: 'men',
    subcategory: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Black'],
    featured: true,
  },
  {
    id: '2',
    name: 'Elegant Evening Dress',
    description: 'Sophisticated evening dress for special occasions',
    price: 199.99,
    image: eveningDress,
    category: 'women',
    subcategory: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Navy', 'Burgundy'],
    featured: true,
  },
  {
    id: '3',
    name: 'Slim Fit Chinos',
    description: 'Comfortable chinos with a modern slim fit',
    price: 79.99,
    image: chinos,
    category: 'men',
    subcategory: 'Pants',
    sizes: ['30', '32', '34', '36'],
    colors: ['Khaki', 'Navy', 'Grey'],
    featured: true,
  },
  {
    id: '4',
    name: 'Leather Crossbody Bag',
    description: 'Genuine leather bag with adjustable strap',
    price: 149.99,
    image: leatherBag,
    category: 'accessories',
    subcategory: 'Bags',
    colors: ['Brown', 'Black', 'Tan'],
    featured: true,
  },
  {
    id: '5',
    name: 'Cashmere Sweater',
    description: 'Luxurious cashmere blend sweater',
    price: 159.99,
    sale: true,
    salePrice: 99.99,
    image: cashmereSweater,
    category: 'women',
    subcategory: 'Tops',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Cream', 'Grey', 'Camel'],
  },
  {
    id: '6',
    name: 'Tailored Blazer',
    description: 'Sharp tailored blazer for professional look',
    price: 249.99,
    sale: true,
    salePrice: 179.99,
    image: tailoredBlazer,
    category: 'men',
    subcategory: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Charcoal', 'Black'],
  },
  {
    id: '7',
    name: 'Summer Linen Pants',
    description: 'Breathable linen pants perfect for warm weather',
    price: 69.99,
    image: linenPants,
    category: 'women',
    subcategory: 'Pants',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Beige', 'Light Blue'],
  },
  {
    id: '8',
    name: 'Minimalist Watch',
    description: 'Elegant minimalist watch with leather strap',
    price: 299.99,
    image: minimalistWatch,
    category: 'accessories',
    subcategory: 'Watches',
    colors: ['Silver', 'Gold', 'Rose Gold'],
  },
];
