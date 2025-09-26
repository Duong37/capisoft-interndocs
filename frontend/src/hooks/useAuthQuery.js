import { useQuery } from '@tanstack/react-query';
import { authService } from '../services/authService';

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authService.getCurrentUser,
    enabled: false, // Don't run automatically, will be triggered manually
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: authService.getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};