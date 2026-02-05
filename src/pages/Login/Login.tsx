
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, setUser } = useAuth();
    const navigate = useNavigate();

    const loginWithGoogle = async () => {
        setIsGoogleLoading(true);
        setError('');

        try {
            const { authService } = await import('../../services/auth.service');
            const response = await authService.loginGoogle();

            if (response.success && response.token) {
                localStorage.setItem('token', response.token);

                const user = {
                    id: response.user.id.toString(),
                    email: response.user.email,
                    name: response.user.username || response.user.email.split('@')[0],
                    role: 'user',
                };

                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/dashboard');
            } else {
                setError('Google authentication failed');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to authenticate with Google');
        } finally {
            setIsGoogleLoading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(username, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Nom d\'utilisateur ou mot de passe incorrect');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-500 text-sm">{error}</p>
                </div>
            )}

            <div>
                <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                    Nom d'utilisateur
                </label>
                <Input
                    id="username"
                    type="text"
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Mot de passe
                </label>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
            </div>

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-foreground/20 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground/70">Se souvenir de moi</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Mot de passe oublié ?
                </Link>
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={isLoading || isGoogleLoading}
            >
                {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-foreground/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card text-foreground/60">Ou continuer avec</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Button
                    onClick={loginWithGoogle}
                    variant="outline"
                    type="button"
                    className="w-full"
                    disabled={isLoading || isGoogleLoading}
                >
                    {isGoogleLoading ? (
                        <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-primary/20 border-t-primary"></div>
                    ) : (
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                    )}
                    {isGoogleLoading ? 'Redirecting...' : 'Google'}
                </Button>
                <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    disabled={isLoading || isGoogleLoading}
                >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                </Button>
            </div>

            <p className="text-center text-sm text-foreground/60">
                En vous connectant, vous acceptez nos{' '}
                <Link to="/terms" className="text-primary hover:underline">
                    Conditions d'utilisation
                </Link>{' '}
                et notre{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                    Politique de confidentialité
                </Link>
            </p>
        </form>
    );
}
