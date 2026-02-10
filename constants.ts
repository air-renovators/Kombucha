import { Product, FlavorProfile } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'starter-kit',
    name: 'Kombucha Starter Kit',
    price: 390,
    category: 'kit',
    image: '/images/starter-kit-hero.png',
    shortDesc: 'Everything you need to brew at home.',
    description: 'Everything you need to start brewing your own living kombucha at home. Designed for the warm Mtunzini climate but perfect for any kitchen.',
    availability: 'In Stock',
    features: [
      '2L Glass Fermentation Jar',
      'Live Heirloom SCOBY (Active Culture)',
      'Starter Liquid',
      'Breathable Cloth Cover + Band',
      'Step-by-Step Brewing Guide',
      'Flavor Inspiration Guide'
    ]
  },
  {
    id: 'kombucha-330',
    name: 'Raw Kombucha 330ml',
    price: 19,
    category: 'drink',
    size: '330ml',
    image: '/images/cool-kick.png',
    shortDesc: 'Perfect single serving.',
    description: 'Traditionally fermented in Zini. Crisp, refreshing, and full of live probiotics.',
    ingredients: ['Filtered Water', 'Organic Tea', 'Raw Cane Sugar', 'Live Kombucha Culture'],
    fermentationNotes: 'Slow-brewed for 14 days for a dry, complex profile.',
    storage: 'Keep refrigerated. Do not shake.',
    disclaimer: 'Contains live cultures. May support gut health.',
    availability: 'In Stock'
  },
  {
    id: 'kombucha-440',
    name: 'Raw Kombucha 440ml',
    price: 25,
    category: 'drink',
    size: '440ml',
    image: '/images/berry-kick.png',
    shortDesc: 'The thirst quencher.',
    description: 'A larger dose of gut-friendly goodness. Perfect for post-surf hydration.',
    ingredients: ['Filtered Water', 'Organic Tea', 'Raw Cane Sugar', 'Live Kombucha Culture'],
    fermentationNotes: 'Natural secondary fermentation in the bottle.',
    storage: 'Keep refrigerated. Open carefully.',
    disclaimer: 'Contains live cultures. May support gut health.',
    availability: 'In Stock'
  },
  {
    id: 'kombucha-1l',
    name: 'Raw Kombucha 1L',
    price: 42,
    category: 'drink',
    size: '1L',
    image: '/images/rooibos-boost.png',
    shortDesc: 'Share the life.',
    description: 'Family size. Naturally carbonated and unpasteurized.',
    ingredients: ['Filtered Water', 'Organic Tea', 'Raw Cane Sugar', 'Live Kombucha Culture'],
    fermentationNotes: 'Small batch production using wild-harvested starters.',
    storage: 'Keep refrigerated. Consume within 4 days of opening.',
    disclaimer: 'Contains live cultures. May support gut health.',
    availability: 'Low Stock'
  }
];

export const FLAVOURS: FlavorProfile[] = [
  {
    id: 'cool-kick',
    name: 'Cool Kick',
    subtitle: 'Lemon & Cucumber',
    desc: 'REFRESHING & ZESTY',
    color: 'bg-[#dfffe0]', // Light green/mint
    icon: 'utensils'
  },
  {
    id: 'berry-kick',
    name: 'Berry Kick',
    subtitle: 'Wild Berry',
    desc: 'SWEET & TART',
    color: 'bg-[#fbe4f6]', // Light pink/purple
    icon: 'flower'
  },
  {
    id: 'rooibos-boost',
    name: 'Rooibos Boost',
    subtitle: 'African Rooibos',
    desc: 'EARTHY & RESTORATIVE',
    color: 'bg-[#f7e6d4]', // Light beige/orange
    icon: 'leaf'
  },
  {
    id: 'black-boost',
    name: 'Black Boost',
    subtitle: 'Classic Black Tea',
    desc: 'BOLD & ENERGIZING',
    color: 'bg-[#dcdcdc]', // Light grey
    icon: 'cup'
  }
];

export const SHIPPING_COST = 99;
export const FREE_SHIPPING_THRESHOLD = 1000;