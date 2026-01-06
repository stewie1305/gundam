
export interface Product {
  id: string;
  name: string;
  series: string;
  grade: 'HG' | 'RG' | 'MG' | 'PG' | 'EG';
  scale: string;
  price: number;
  rating: number;
  image: string;
  stock: number;
  description: string;
  hot?: boolean;
}

export interface Series {
  id: string;
  name: string;
  timeline: string;
  image: string;
  tag: string;
}

export interface User {
  id: string;
  name: string;
  role: 'PILOT' | 'COMMANDER';
  avatar?: string;
}

export enum Page {
  HOME = 'home',
  LOGIN = 'login',
  ADMIN = 'admin',
}
