import { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        'https://croma-backend-1.onrender.com/auth/logout',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        toast({
          title: 'Logout Successful',
          description: response.data.msg,
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true
        });
        localStorage.removeItem('token');
        setToken(null);
      } else {
        throw new Error('Failed to logout');
      }
    } catch (error) {
      toast({
        title: 'Logout Failed',
        description: error.message || 'An error occurred',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true
      });
    }
  };

  const isLoggedIn = !!token;

  const value = {
    token,
    isLoggedIn,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
