import { apiClient } from '../config/api.config';
import type { AuthenticationRequest, AuthenticationResponse } from '../types/api.types';

export const authService = {
  /**
   * Login with username and password
   */
  login: async (credentials: AuthenticationRequest): Promise<AuthenticationResponse> => {
    const response = await apiClient.post<AuthenticationResponse>(
      '/api/auth/login',
      credentials
    );
    return response.data;
  },

  /**
   * Login with Google OAuth using popup window
   */
  loginGoogle: (): Promise<{
    success: boolean;
    token: string;
    expiresIn: number;
    user: {
      id: number;
      email: string;
      username: string;
    };
  }> => {
    return new Promise((resolve, reject) => {
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const frontendUrl = window.location.origin;
      const callbackUrl = `${frontendUrl}/google-callback.html`;
      const oauthUrl = `${apiClient.defaults.baseURL}/api/auth/login/google?redirect_uri=${encodeURIComponent(callbackUrl)}`;

      const popup = window.open(
        oauthUrl,
        'Google Sign In',
        `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
      );

      if (!popup) {
        reject(new Error('Popup blocked. Please allow popups for this site.'));
        return;
      }

      let authCompleted = false;

      const cleanup = () => {
        clearInterval(checkPopup);
        window.removeEventListener('storage', storageListener);
        window.removeEventListener('message', messageListener);
      };

      const handleSuccess = (response: any) => {
        authCompleted = true;
        cleanup();

        try {
          popup.close();
        } catch (e) {
          // Popup may be already closed or COOP prevents closing
        }

        if (response.success) {
          resolve(response);
        } else {
          reject(new Error(response.message || 'Authentication failed'));
        }
      };

      const checkPopup = setInterval(() => {
        try {
          if (popup.closed && !authCompleted) {
            cleanup();

            const storedResponse = localStorage.getItem('googleAuthResponse');
            if (storedResponse) {
              const response = JSON.parse(storedResponse);
              localStorage.removeItem('googleAuthResponse');
              handleSuccess(response);
            } else {
              reject(new Error('Authentication cancelled'));
            }
          }
        } catch (e) {
          // COOP policy may block window.closed check
        }
      }, 300);

      const storageListener = (e: StorageEvent) => {
        if (e.key === 'googleAuthResponse' && e.newValue) {
          try {
            const response = JSON.parse(e.newValue);
            localStorage.removeItem('googleAuthResponse');
            handleSuccess(response);
          } catch (error) {
            cleanup();
            reject(new Error('Failed to parse authentication response'));
          }
        }
      };

      const messageListener = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) {
          return;
        }

        if (event.data?.type === 'googleAuthResponse' && event.data?.data) {
          handleSuccess(event.data.data);
        }
      };

      window.addEventListener('storage', storageListener);
      window.addEventListener('message', messageListener);

      setTimeout(() => {
        if (!authCompleted) {
          cleanup();
          try {
            popup.close();
          } catch (e) {
            // Ignore
          }
          reject(new Error('Authentication timeout'));
        }
      }, 5 * 60 * 1000);
    });
  },

  /**
   * Get current user info
   */
  getCurrentUser: async (): Promise<any> => {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },

  /**
   * Logout
   */
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
