import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children:  React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Expose setUser for Google OAuth callback
  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Import auth service dynamically to avoid circular dependency
      const { authService } = await import('../services/auth.service');

      // Call the actual API
      const response = await authService.login({
        username: email,
        password: password,
      });

      // Store token
      localStorage.setItem('token', response.token);

      // Create user object from available data
      // Note: Backend login doesn't return user ID/email, only token and role
      const user: User = {
        id: '1', // Placeholder - backend doesn't return user ID
        email: email,
        name: email.split('@')[0],
        role: response.role || 'user',
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, _password: string, name: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual registration API call
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, setUser: updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
