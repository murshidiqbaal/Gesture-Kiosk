
import React from 'react';
import { MenuItem, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'food', name: 'Burgers & Food', icon: '🍔' },
  { id: 'snacks', name: 'Sides & Snacks', icon: '🍟' },
  { id: 'juice', name: 'Drinks & Juice', icon: '🧃' }
];

export const MENU_ITEMS: MenuItem[] = [
  // Food
  { id: 'f1', name: 'Classic Beef Burger', price: 12.99, image: 'https://picsum.photos/id/163/400/300', category: 'food' },
  { id: 'f2', name: 'Double Cheese Burger', price: 15.49, image: 'https://picsum.photos/id/429/400/300', category: 'food' },
  { id: 'f3', name: 'Veggie Power Bowl', price: 10.99, image: 'https://picsum.photos/id/493/400/300', category: 'food' },
  { id: 'f4', name: 'Crispy Chicken Sandwich', price: 11.99, image: 'https://picsum.photos/id/102/400/300', category: 'food' },
  
  // Snacks
  { id: 's1', name: 'Large Salty Fries', price: 4.99, image: 'https://picsum.photos/id/431/400/300', category: 'snacks' },
  { id: 's2', name: 'Chicken Nuggets (10pc)', price: 7.99, image: 'https://picsum.photos/id/514/400/300', category: 'snacks' },
  { id: 's3', name: 'Onion Rings', price: 5.49, image: 'https://picsum.photos/id/674/400/300', category: 'snacks' },
  
  // Juice
  { id: 'j1', name: 'Fresh Orange Juice', price: 5.99, image: 'https://picsum.photos/id/1080/400/300', category: 'juice' },
  { id: 'j2', name: 'Cold Brew Coffee', price: 4.50, image: 'https://picsum.photos/id/63/400/300', category: 'juice' },
  { id: 'j3', name: 'Sparkling Lemonade', price: 3.99, image: 'https://picsum.photos/id/82/400/300', category: 'juice' }
];
