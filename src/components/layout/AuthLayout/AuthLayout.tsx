import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../Container/Container';
import { Button } from '../../ui';
import { useAuth } from '../../../contexts/AuthContext';
import ThemeToggle from '../../shared/ThemeToggle/ThemeToggle';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showAuthToggle?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showAuthToggle = true,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-foreground/10 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              SmartLogi
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              {user && (
                <span className="text-foreground/70 hidden sm:inline">
                  Bonjour, {user.name}!
                </span>
              )}
              {showAuthToggle && (
                <Button
                  onClick={() => navigate(user ? '/dashboard' : '/login')}
                  variant={user ? 'outline' : 'primary'}
                  size="sm"
                >
                  {user ? 'Dashboard' : 'Connexion'}
                </Button>
              )}
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-foreground/60">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form Card */}
          <div className="bg-card border border-foreground/10 rounded-xl shadow-lg p-6 sm:p-8">
            {children}
          </div>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-foreground/60">
              {title.includes('Connexion') || title.includes('Sign In') ? (
                <>
                  Pas encore de compte ?{' '}
                  <Link to="/register" className="text-primary font-medium hover:underline">
                    S'inscrire gratuitement
                  </Link>
                </>
              ) : (
                <>
                  Vous avez déjà un compte ?{' '}
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Se connecter
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-foreground/10 py-6 mt-auto">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-center text-foreground/60 text-sm">
              &copy; {new Date().getFullYear()} SmartLogi SDMS. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/privacy" className="text-foreground/60 hover:text-primary transition-colors">
                Confidentialité
              </Link>
              <Link to="/terms" className="text-foreground/60 hover:text-primary transition-colors">
                Conditions
              </Link>
              <Link to="/help" className="text-foreground/60 hover:text-primary transition-colors">
                Aide
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default AuthLayout;
