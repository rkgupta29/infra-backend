import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { apiRequest } from './index';
import type  { LoginResponse, LoginRequest } from '@/types/profile';

// Login mutation
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<LoginResponse> => {
      const response = await apiRequest<LoginResponse, LoginRequest>("POST", '/auth/login', credentials);
      
      if (response.access_token) {
        Cookies.set('auth_token', response.access_token, { expires: 7 }); // Expires in 7 days
      }
      
      return response;
    },
  });
};


// Logout function
export const logout = () => {
  Cookies.remove('auth_token');
  // You can add additional cleanup here if needed
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!Cookies.get('auth_token');
};
