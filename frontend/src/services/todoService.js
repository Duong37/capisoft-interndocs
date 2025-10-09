import api from './api';

export const todoService = {
  // TodoList operations
  getTodoLists: async (params = {}) => {
    const response = await api.get('/todolists/', { params });
    return response.data;
  },

  getTodoList: async (id) => {
    const response = await api.get(`/todolists/${id}/`);
    return response.data;
  },

  createTodoList: async (data) => {
    const response = await api.post('/todolists/', data);
    return response.data;
  },

  updateTodoList: async (id, data) => {
    const response = await api.put(`/todolists/${id}/`, data);
    return response.data;
  },

  deleteTodoList: async (id) => {
    const response = await api.delete(`/todolists/${id}/`);
    return response.data;
  },

  // TodoItem operations
  getTodoItems: async (params = {}) => {
    const response = await api.get('/todoitems/', { params });
    return response.data;
  },

  getTodoItem: async (id) => {
    const response = await api.get(`/todoitems/${id}/`);
    return response.data;
  },

  createTodoItem: async (data) => {
    const response = await api.post('/todoitems/', data);
    return response.data;
  },

  updateTodoItem: async (id, data) => {
    const response = await api.put(`/todoitems/${id}/`, data);
    return response.data;
  },

  deleteTodoItem: async (id) => {
    const response = await api.delete(`/todoitems/${id}/`);
    return response.data;
  },

  // Get items assigned to current user
  getAssignedItems: async () => {
    const response = await api.get('/todoitems/assigned_to_me/');
    return response.data;
  },

  // Get paginated items assigned to current user
  getAssignedItemsPaginated: async (page = 1, limit = 10) => {
    const response = await api.get('/todoitems/assigned_to_me/', {
      params: { page, limit }
    });
    return response.data;
  },

  };

export default todoService;