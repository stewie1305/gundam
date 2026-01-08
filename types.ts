export interface Product {
  id: string;
  name: string;
  series: string;
  grade: "HG" | "RG" | "MG" | "PG" | "EG" | "TOOL" | "PAINT" | "SERVICE";
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
  role:
    | "CUSTOMER"
    | "SALES_SUPPORT"
    | "OPERATIONS"
    | "MANAGER"
    | "SYSTEM_ADMIN";
  avatar?: string;
}

export interface PilotProfile {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  ward: string;
  address: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: "user" | "model" | "ai";
  text: string;
}

export type OrderStatus =
  | "PROCESSING"
  | "DEPLOYED"
  | "ARRIVED"
  | "CANCELLED"
  | "WORKSHOP_PENDING"
  | "AWAITING_PREORDER"
  | "RETURN_REQUESTED"
  | "REFUNDED";

export type OrderType = "STANDARD" | "CUSTOM" | "PRE_ORDER";

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  paymentMethod: "BANK_TRANSFER" | "COD";
  status: OrderStatus;
  type?: OrderType;
  customNotes?: string;
  complaintDetails?: string;
}

export enum Page {
  HOME = "home",
  LOGIN = "login",
  ADMIN = "admin",
}
