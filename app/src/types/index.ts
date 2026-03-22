export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  isVeg: boolean;
  rating?: number;
  reviews?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerDetails: CustomerDetails;
  totalAmount: number;
  deliveryCharge: number;
  gstAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  landmark?: string;
  city: string;
  pincode: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled';

export type PaymentMethod = 'razorpay' | 'cod';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'customer';
  addresses?: Address[];
}

export interface Address {
  id: string;
  address: string;
  landmark?: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'food' | 'interior' | 'special';
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minOrderAmount: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive: boolean;
}

export interface DeliveryArea {
  id: string;
  name: string;
  pincode: string;
  deliveryCharge: number;
  estimatedTime: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  todayRevenue: number;
  todayOrders: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  orders: number;
}
