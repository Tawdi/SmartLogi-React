import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface GoogleOAuthResponse {
  success: boolean;
  token: string;
  expiresIn: number;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

export default function GoogleCallback() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const processGoogleResponse = (response: GoogleOAuthResponse) => {
      if (!response.success || !response.token) {
        setError('Invalid authentication response');
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

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
    };

    const handleCallback = async () => {
      try {
        const googleAuthData = localStorage.getItem('googleAuthResponse');
        if (googleAuthData) {
          const response: GoogleOAuthResponse = JSON.parse(googleAuthData);
          processGoogleResponse(response);
          localStorage.removeItem('googleAuthResponse');
          return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const userId = urlParams.get('userId');
        const email = urlParams.get('email');
        const username = urlParams.get('username');

        if (token && email) {
          processGoogleResponse({
            success: true,
            token,
            expiresIn: 36000000,
            user: {
              id: parseInt(userId || '0'),
              email,
              username: username || email,
            },
          });
          return;
        }

        const errorParam = urlParams.get('error');
        if (errorParam) {
          setError('Google login failed: ' + errorParam);
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        setError('No authentication data received from Google');
        setTimeout(() => navigate('/login'), 3000);

      } catch (err: any) {
        console.error('Google callback error:', err);
        setError(err.message || 'Failed to complete Google login');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        {error ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Authentication Failed</h2>
            <p className="text-foreground/60">{error}</p>
            <p className="text-sm text-foreground/40">Redirecting to login...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
            <h2 className="text-xl font-semibold text-foreground">Completing Google Sign-In...</h2>
            <p className="text-foreground/60">Please wait while we authenticate you.</p>
          </div>
        )}
      </div>
    </div>
  );
}
