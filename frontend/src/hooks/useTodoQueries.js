import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { todoService } from '../services/todoService';

// TodoList queries
// All todo lists
export const useTodoListsQuery = (params = {}) => {
  return useQuery({
    queryKey: ['todolists', params],
    queryFn: () => todoService.getTodoLists(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// A single todo list
export const useTodoListQuery = (id) => {
  return useQuery({
    queryKey: ['todolists', id],
    queryFn: () => todoService.getTodoList(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

// Create a new todo list
export const useCreateTodoListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoService.createTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todolists'] });
    },
  });
};

// Update a todo list
export const useUpdateTodoListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => todoService.updateTodoList(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['todolists', variables.id], exact: true });
    },
  });
};

// Delete a todo list
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
// All todo items
export const useTodoItemsQuery = (params = {}) => {
  return useQuery({
    queryKey: ['todoitems', params],
    queryFn: () => todoService.getTodoItems(params),
    staleTime: 2 * 60 * 1000,
  });
};

// A single todo item
export const useTodoItemQuery = (id) => {
  return useQuery({
    queryKey: ['todoitems', id],
    queryFn: () => todoService.getTodoItem(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

// All todo items assigned to the current user
export const useAssignedItemsQuery = () => {
  return useQuery({
    queryKey: ['todoitems', 'assigned_to_me'],
    queryFn: todoService.getAssignedItems,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Create a new todo item
export const useCreateTodoItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoService.createTodoItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoitems'] });
    },
  });
};

// Create a new todo item in a todo list
export const useCreateTodoItemInListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemData, todolistId }) => todoService.createTodoItemInList(itemData, todolistId),
    onSuccess: (newItem, variables) => {
      // Targeted cache updates for better performance
      queryClient.invalidateQueries({ queryKey: ['todoitems'] });

      if (variables?.todolistId) {
        queryClient.invalidateQueries({ queryKey: ['todolists', variables.todolistId] });
        queryClient.invalidateQueries({ queryKey: ['todolists'] });
      }

      // Also refresh assigned items if the new item has an assignee
      if (newItem?.assignee) {
        queryClient.invalidateQueries({ queryKey: ['todoitems', 'assigned_to_me'] });
      }
    },
  });
};

// Update a todo item
export const useUpdateTodoItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => todoService.updateTodoItem(id, data),
    onSuccess: (data) => {
      // Invalidate all todoitems queries to refresh list views
      queryClient.invalidateQueries({ queryKey: ['todoitems'] });

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

// Delete a todo item
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

// Infinite query hooks
// Infinite todo lists
export const useTodoListsInfiniteQuery = (params = {}) => {
  return useInfiniteQuery({
    queryKey: ['todolists', 'infinite', params],
    queryFn: ({ pageParam = 1 }) =>
      todoService.getTodoLists({ ...params, page: pageParam, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has fewer than 10 items, we've reached the end
      if (lastPage.length < 10) {
        return undefined;
      }
      // Otherwise, fetch the next page
      return allPages.length + 1;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Infinite assigned items
export const useAssignedItemsInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ['todoitems', 'assigned_to_me', 'infinite'],
    queryFn: ({ pageParam = 1 }) =>
      todoService.getAssignedItemsPaginated(pageParam, 10),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has fewer than 10 items, we've reached the end
      if (lastPage.length < 10) {
        return undefined;
      }
      // Otherwise, fetch the next page
      return allPages.length + 1;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};