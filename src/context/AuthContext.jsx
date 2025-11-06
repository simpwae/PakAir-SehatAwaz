import { createContext, useContext, useState, useEffect } from 'react';
import { officialUsers, citizenUsers } from '../data/mockUsers';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('auth_user');
    if (authStatus === 'true' && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('isAuthenticated');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const allUsers = [...officialUsers, ...citizenUsers];
    const found = allUsers.find(
      (u) => u.email.toLowerCase().trim() === String(email).toLowerCase().trim() && u.password === password
    );
    if (!found) {
      return { ok: false, message: 'Invalid email or password. Please try again.' };
    }
    setIsAuthenticated(true);
    setUser({ id: found.id, name: found.name, email: found.email, role: found.role });
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('auth_user', JSON.stringify({ id: found.id, name: found.name, email: found.email, role: found.role }));
    return { ok: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
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

