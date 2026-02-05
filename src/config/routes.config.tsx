import type { AppRoute, NavigationItem } from '../types/routes';

import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import Tracking from '../pages/Tracking/Tracking';
import About from '../pages/About/About';
import GoogleCallback from '../pages/GoogleCallback/GoogleCallback';
import ParcelsList from '../pages/Parcels/ParcelsList';
import ParcelDetail from '../pages/Parcels/ParcelDetail';
import DriversList from '../pages/Drivers/DriversList';
import ProductsList from '../pages/Products/ProductsList';
import RecipientsList from '../pages/Recipients/RecipientsList';
import ClientsList from '../pages/Clients/ClientsList';
import ZonesList from '../pages/Zones/ZonesList';
import DeliveriesList from '../pages/Deliveries/DeliveriesList';
import AuthLayout from '../components/layout/AuthLayout/AuthLayout';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';

// Main routes configuration
export const appRoutes: AppRoute[] = [
  {
    path: '/',
    name: 'Home',
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: '/tracking',
    name: 'Tracking',
    element: (
      <MainLayout>
        <Tracking />
      </MainLayout>
    ),
  },
  {
    path: '/about',
    name: 'About',
    element: (
      <MainLayout>
        <About />
      </MainLayout>
    ),
  },
  {
    path: '/login',
    name: 'Login',
    element: (
      <AuthLayout title="Connexion" subtitle="Bienvenue sur SmartLogi SDMS">
        <Login />
      </AuthLayout>
    )
  },
  {
    path: '/register',
    name: 'Register',
    element: (
      <AuthLayout title="Créer un compte" subtitle="Commencez gratuitement dès aujourd'hui">
        <Register />
      </AuthLayout>
    )
  },
  {
    path: '/auth/google/callback',
    name: 'GoogleCallback',
    element: <GoogleCallback />
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    ),
    isProtected: true,
  },
  {
    path: '/dashboard/parcels',
    name: 'Parcels',
    element: (
      <DashboardLayout>
        <ParcelsList />
      </DashboardLayout>
    ),
    isProtected: true,
  },
  {
    path: '/dashboard/parcels/:id',
    name: 'ParcelDetail',
    element: (
      <DashboardLayout>
        <ParcelDetail />
      </DashboardLayout>
    ),
    isProtected: true,
  },
  {
    path: '/dashboard/drivers',
    name: 'Drivers',
    element: (
      <DashboardLayout>
        <DriversList />
      </DashboardLayout>
    ),
    isProtected: true,
  },
  {
    path: '/dashboard/products',
    name: 'Products',
    element: (
      <DashboardLayout>
        <ProductsList />
      </DashboardLayout>
    ),
    isProtected: true,
  },
  {
    path: '/dashboard/recipients',
    name: 'Recipients',
    element: (
      <DashboardLayout>
        <RecipientsList />
      </DashboardLayout>
    ),
    isProtected: true,
  },
  {
    path: '/dashboard/clients',
    name: 'Clients',
    element: (
      <DashboardLayout>
        <ClientsList />
      </DashboardLayout>
    ),
    isProtected: true,
  },
  {
    path: '/dashboard/deliveries',
    name: 'Deliveries',
    element: (
      <DashboardLayout>
        <DeliveriesList />
      </DashboardLayout>
    ),
    isProtected: true,
  },
  {
    path: '/dashboard/zones',
    name: 'Zones',
    element: (
      <DashboardLayout>
        <ZonesList />
      </DashboardLayout>
    ),
    isProtected: true,
  },
  {
    path: '/dashboard/tracking',
    name: 'Tracking',
    element: (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Suivi des Colis</h1>
          <p className="text-foreground/60">Suivi en temps réel</p>
        </div>
      </DashboardLayout>
    ),
    isProtected: true,
  },
  {
    path: '/dashboard/profile',
    name: 'Profile',
    element: (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Mon Profil</h1>
          <p className="text-foreground/60">Gérer vos informations</p>
        </div>
      </DashboardLayout>
    ),
    isProtected: true,
  },
  {
    path: '/dashboard/settings',
    name: 'Settings',
    element: (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-foreground/60">Configuration de votre compte</p>
        </div>
      </DashboardLayout>
    ),
    isProtected: true,
  },
]

// Navigation items for header
export const headerNavigation: NavigationItem[] = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    isProtected: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    isProtected: true,
  },
  {
    path: '/settings',
    name: 'Settings',
    isProtected: true,
  },
];

// Auth navigation items
export const authNavigation: NavigationItem[] = [
  {
    path: '/login',
    name: 'Login',
  },
  {
    path: '/register',
    name: 'Register',
  },
];
