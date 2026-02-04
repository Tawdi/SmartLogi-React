export interface AppRoute {
  path: string;
  name: string;
  element: React.ReactNode;
  isProtected?: boolean;
  icon?: React.ReactNode;
  children?: AppRoute[];
}

// Navigation items for header/sidebar
export interface NavigationItem {
  path: string;
  name: string;
  icon?: React.ReactNode;
  isProtected?: boolean;
  children?: NavigationItem[];
}

// Route groups
export  type RouteGroup
    = 'PUBLIC' | 'PROTECTED' | 'ADMIN' | 'USER' | 'GUEST' | 'AUTH';
