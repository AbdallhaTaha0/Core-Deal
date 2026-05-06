export type User = {
  _id : string;
  name : string,
  email : string,
  phone? : string,
  address? : string,
  role : string,
  createdAt: string,
  updatedAt: string
}


export type LoginData = {
  email: string,
  password: string
}


export type RegisterData={
  name:string,
  email:string,
  password:string,
  phone?:string,
  address?:string
}

export type Cart = {
  _id: string;
  userId: string;
  productId: string;
  quantity: number;
  priceAtTime: number;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  _id: string;
  name: string;
  description?: string;
  parentCategory?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  _id: string;
  userId: string;
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  _id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
};

export type SpecificationsType = {
  cpu?: string;
  ram?: string;
  storage?: string;
  gpu?: string;
  screenSize?: string;
  refreshRate?: string;
  battery?: string;
  color?: string;
  weight?: string;
};

export type Product = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  brand?: string;
  images?: string[];
  specifications?: SpecificationsType;
  status: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};
