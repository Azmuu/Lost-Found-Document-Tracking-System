import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [liveNotification, setLiveNotification] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const persistAuth = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const clearAuth = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    if (socket) socket.disconnect();
    setSocket(null);
  }, [socket]);

  const login = async (email, password) => {
    const { data } = await authService.login({ email, password });
    persistAuth(data.token, data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await authService.register({ name, email, password });
    persistAuth(data.token, data.user);
    return data;
  };

  const logout = () => clearAuth();

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await authService.getMe();
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user || !token) return;

    const newSocket = io(SOCKET_URL, { auth: { token } });
    newSocket.on('notification', (notification) => {
      setLiveNotification(notification);
      setUnreadCount((c) => c + 1);
    });
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [user?._id]);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
    socket,
    liveNotification,
    unreadCount,
    setUnreadCount,
    clearLiveNotification: () => setLiveNotification(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
