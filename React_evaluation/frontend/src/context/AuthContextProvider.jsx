import React, { useState } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authDetails, setAuthDetails] = useState({
    isAuthenticated: false,
    token: null,
    email: null,
  });

  const login = (token, email) => {
    if (!token ||!email) {
      throw new Error('Invalid token or email');
    }
    setAuthDetails({
      isAuthenticated: true,
      token,
      email,
    });
  };

  const logout = () => {
    setAuthDetails({
      isAuthenticated: false,
      token: null,
      email: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;