export type UserRole = 'customer' | 'worker' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  location?: string;
  address?: string;
  createdAt: string;
  isVerified?: boolean;
  status: 'active' | 'suspended' | 'pending';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
}
