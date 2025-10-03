import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '../services/todoService';

// TodoList queries
export const useTodoListsQuery = (params = {}) => {
  return useQuery({
    queryKey: ['todolists', params],
    queryFn: () => todoService.getTodoLists(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useTodoListQuery = (id) => {
  return useQuery({
    queryKey: ['todolists', id],
    queryFn: () => todoService.getTodoList(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateTodoListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoService.createTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todolists'] });
    },
  });
};

export const useUpdateTodoListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => todoService.updateTodoList(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['todolists', variables.id], exact: true });
    },
  });
};

export const useDeleteTodoListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoService.deleteTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todolists'] });
    },
  });
};

// TodoItem queries
export const useTodoItemsQuery = (params = {}) => {
  return useQuery({
    queryKey: ['todoitems', params],
    queryFn: () => todoService.getTodoItems(params),
    staleTime: 2 * 60 * 1000,
  });
};

export const useTodoItemQuery = (id) => {
  return useQuery({
    queryKey: ['todoitems', id],
    queryFn: () => todoService.getTodoItem(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useAssignedItemsQuery = () => {
  return useQuery({
    queryKey: ['todoitems', 'assigned_to_me'],
    queryFn: todoService.getAssignedItems,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useCreateTodoItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoService.createTodoItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoitems'] });
    },
  });
};

export const useUpdateTodoItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => todoService.updateTodoItem(id, data),
    onSuccess: (data, variables) => {
      // Before (too broad):
      // queryClient.invalidateQueries({ queryKey: ['todoitems'] });
      // queryClient.invalidateQueries({ queryKey: ['todoitems', variables.id] });
      // queryClient.invalidateQueries({ queryKey: ['todolists'] });
      // queryClient.invalidateQueries({ queryKey: ['todoitems', 'assigned_to_me'] });
    
      // After (targeted):
      queryClient.invalidateQueries({ queryKey: ['todoitems', variables.id], exact: true });
    
      if (data?.todolist) {
        // list assignment changed or list aggregates depend on items
        queryClient.invalidateQueries({ queryKey: ['todolists'] });
      }
      if (Object.prototype.hasOwnProperty.call(data ?? {}, 'assignee')) {
        queryClient.invalidateQueries({ queryKey: ['todoitems', 'assigned_to_me'], exact: true });
      }
    },
  });
};

export const useDeleteTodoItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoService.deleteTodoItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoitems'] });
      queryClient.invalidateQueries({ queryKey: ['todolists'] });
      queryClient.invalidateQueries({ queryKey: ['todoitems', 'assigned_to_me'] });
    },
  });
};