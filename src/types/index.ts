export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  password: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  category: string;
  date: string;
  venue: string;
  price: number;
  imageUrl: string;
  tags?: string[];
  featured?: boolean;
  createdBy: string;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  bookingDate: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
