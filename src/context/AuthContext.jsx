import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('auth_user');
      
      if (token && storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          // Verify token is still valid by calling getMe
          try {
            const response = await authAPI.getMe();
            if (response.success) {
              setUser(response.user);
              setIsAuthenticated(true);
              // Update stored user data
              localStorage.setItem('auth_user', JSON.stringify(response.user));
            } else {
              // Token invalid, clear storage
              localStorage.removeItem('auth_token');
              localStorage.removeItem('auth_user');
              localStorage.removeItem('isAuthenticated');
            }
          } catch (error) {
            // Token invalid or expired
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            localStorage.removeItem('isAuthenticated');
          }
        } catch (e) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          localStorage.removeItem('isAuthenticated');
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.success && response.token && response.user) {
        setIsAuthenticated(true);
        setUser(response.user);
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('auth_user', JSON.stringify(response.user));
        localStorage.setItem('isAuthenticated', 'true');
        return { ok: true };
      } else {
        return { ok: false, message: response.message || 'Login failed' };
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed. Please try again.';
      return { ok: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      if (response.success && response.token && response.user) {
        setIsAuthenticated(true);
        setUser(response.user);
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('auth_user', JSON.stringify(response.user));
        localStorage.setItem('isAuthenticated', 'true');
        return { ok: true };
      } else {
        return { ok: false, message: response.message || 'Registration failed' };
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed. Please try again.';
      return { ok: false, message };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

