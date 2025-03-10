
export interface CarType {
  id: number;
  name: string;
  category: string;
  price: number;
  per_day: boolean;
  image: string;
  images: string[];
  specs: string[];
  description: string | null;
  features: string[];
  locations: string[];
}

export interface AvailableDateType {
  id: number;
  car_id: number;
  date: string;
}

export interface BookingType {
  id: number;
  car_id: number;
  car_name: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface AdminUserType {
  id: number;
  username: string;
  password: string;
}
