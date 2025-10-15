import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { todoService } from '../services/todoService';

// TodoList queries
// All todo lists
// Not used anymore since we use useTodoListsInfiniteQuery instead
export const useTodoListsQuery = (params = {}) => {
  return useQuery({
    queryKey: ['todolists', params],
    queryFn: () => todoService.getTodoLists(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// A single todo list
// Not used since we fetch all todo lists upon loading the todo page
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
    onMutate: async () => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todolists'] });

      // Snapshot the previous value
      const previousLists = queryClient.getQueryData(['todolists', 'infinite']);

      // Create optimistic list for UI
      const optimisticList = {
        id: `temp-${Date.now()}`,
        items: [],
        created_at: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      };

      // Optimistically add the new list to the first page (at the end for chronological order)
      if (previousLists) {
        queryClient.setQueryData(['todolists', 'infinite'], (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page, index) =>
              index === 0
                ? { ...page, results: [...page.results, optimisticList] }
                : page
            )
          };
        });
      }

      return { previousLists };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousLists) {
        queryClient.setQueryData(['todolists', 'infinite'], context.previousLists);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['todolists'] });
    },
  });
};

// Update a todo list
// Not used since we have useCreateTodoItemMutation which includes updating the todo list
export const useUpdateTodoListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => todoService.updateTodoList(id, data),
    onSuccess: (_data, variables) => {
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
// Not used since we fetch all todo items upon expanding a todo list
export const useTodoItemQuery = (id) => {
  return useQuery({
    queryKey: ['todoitems', id],
    queryFn: () => todoService.getTodoItem(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

// All todo items assigned to the current user
// Not used since we use useAssignedItemsInfiniteQuery instead
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
    onMutate: async (itemData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todoitems'] });
      await queryClient.cancelQueries({ queryKey: ['todolists'] });

      // Snapshot the previous values
      const previousListItems = itemData.todolist_id;
      const previousLists = queryClient.getQueryData(['todolists', 'infinite']);

      // Create optimistic item with temporary ID
      const optimisticItemId = `temp-${Date.now()}`;
      const optimisticItem = {
        ...itemData,
        id: optimisticItemId,
        created_at: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      };

      // Optimistically add the new item to the specific todolist items cache
      if (itemData.todolist_id) {
        queryClient.setQueryData(['todoitems', { todolist: itemData.todolist_id }], (old) => {
          if (!old) {
            return { count: 1, next: null, previous: null, results: [optimisticItem] };
          }

          // Add to existing paginated results
          return {
            ...old,
            count: (old.results?.length || 0) + 1,
            results: [...(old.results || []), optimisticItem]
          };
        });
      }

      // Optimistically add item ID to the parent list's items array
      if (itemData.todolist_id) {
        queryClient.setQueryData(['todolists', 'infinite'], (old) => {
          if (!old) return old;
          
          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              results: page.results.map(list =>
                list.id === itemData.todolist_id
                  ? { ...list, items: [...(list.items || []), optimisticItemId] }
                  : list
              )
            }))
          };
        });
      }

      return { previousListItems, previousLists, optimisticItem };
    },
    onError: (_err, variables, context) => {
      // Rollback on error
      if (context?.previousListItems) {
        const todolistId = variables?.todolist_id;
        if (todolistId) {
          queryClient.setQueryData(['todoitems', { todolist: todolistId }], context.previousListItems);
        }
      }
      if (context?.previousLists) {
        queryClient.setQueryData(['todolists', 'infinite'], context.previousLists);
      }
    },
    onSettled: (newItem, _error, variables) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['todoitems'] });
      queryClient.invalidateQueries({ queryKey: ['todolists'] });

      // Also refresh the specific todolist items if todolist_id was provided
      if (variables?.todolist_id) {
        queryClient.invalidateQueries({ queryKey: ['todoitems', { todolist: variables.todolist_id }] });
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
      todoService.getTodoLists({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, pageParam) => {
      // Check if there are more pages to fetch
      if (lastPage.next) {
        return pageParam + 1;
      }
      // No more pages
      return undefined;
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
    getNextPageParam: (lastPage, _allPages, pageParam) => {
      // Check if there are more pages to fetch
      if (lastPage.next) {
        return pageParam + 1;
      }
      // No more pages
      return undefined;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};