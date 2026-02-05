export type Theme = 'light' | 'dark';

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Route types
export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  isProtected?: boolean;
}

// Auth types
export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}
