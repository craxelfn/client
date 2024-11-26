// useLogin.ts
import { useState } from 'react';
import axios from 'axios';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8081/auth/login', {
        email,
        password
      }, {
        withCredentials: true // Important for handling cookies/session
      });

      // If login is successful
      if (response.data) {
        // Optionally store user data in localStorage or context
        localStorage.setItem('user', JSON.stringify(response.data));
        setIsLoading(false);
        return true; // Indicate successful login
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      setIsLoading(false);
      return false;
    }
  };

  return { login, error, isLoading };
};