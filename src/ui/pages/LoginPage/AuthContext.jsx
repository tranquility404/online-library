import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthHelper } from '../../../scripts/controllers/LoginControl';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated, initiateLogin, initiateRegistration } = useAuthHelper();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const validateLogin = (event) => {
        event.preventDefault();
        setError('');

        if (email === '') {
            setError('Enter Email');
            return;
        } else if (password === '') {
            setError('Enter Password');
            return;
        } else if (!isLogin && name == "") {
            setError('Name is required');
            return;
        }

        if (email.length > 4 && password.length > 4) {
            if (!isLogin)
                initiateRegistration(name, email, password, navigate);
            else
                initiateLogin(email, password, navigate)
            return;
        } else {
            setError('Inavalid Email or Password');
            return;
        }
    };

  useEffect(() => {
    
  }, []);

  return (
    <AuthContext.Provider value={{ name, setName, email, setEmail, password, setPassword, error, setError, isLogin, setIsLogin, validateLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
