import React, { createContext, useEffect, useState } from 'react';
import { status } from '../../../scripts/api/ApiRequests';

export const AuthStatusContext = createContext();

export const AuthStatusProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const res = await status();
      setIsAuthenticated(res.status == 200);
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthStatusContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
      {children}
    </AuthStatusContext.Provider>
  );
};
