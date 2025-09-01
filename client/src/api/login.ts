import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { apiRequest } from './index';
import type  { LoginResponse, LoginRequest } from '@/types/profile';
import type { Profile } from '@/types/profile';

// Login mutation
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<LoginResponse> => {
      const response = await apiRequest<LoginResponse, LoginRequest>("POST", '/auth/login', credentials);
      
      if (response.access_token) {
        Cookies.set('auth_token_admin', response.access_token, { expires: 7 }); // Expires in 7 days
      }
      
      return response;
    },
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await apiRequest<Profile, {}>("GET", "/admin/profile");
      return response;
    },
    retry: false,
  });
};


// Logout function
export const logout = () => {
  Cookies.remove('auth_token_admin');
};


