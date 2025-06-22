export interface User {
  id: string;
  name: string;
  email?: string;
  profileImage?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

export interface AuthContextType extends AuthState {
  login: () => void;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
}
