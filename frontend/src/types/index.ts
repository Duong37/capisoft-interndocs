// User types
export interface User {
  id: string;
  email: string;
  user_type: 'USER' | 'ADMIN';
  is_active: boolean;
  first_name: string;
  last_name: string;
  phone: string;
  birthday: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  firebaseUser: any | null;
  backendUser: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  logout: () => Promise<void>;
  register: (email: string, password: string, userType?: 'USER' | 'ADMIN', adminCode?: string) => Promise<{ success: boolean; error?: any }>;
}

// TodoList types
export interface TodoList {
  id: string;
  title: string;
  description: string;
  owner: string;
  created_at: string;
  updated_at: string;
  items_count?: number;
}

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assigned_to: string | null;
  todo_list: string;
  created_at: string;
  updated_at: string;
  assigned_to_details?: {
    id: string;
    email: string;
    user_type: string;
  };
}

export interface TodoItemCreate {
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assigned_to: string | null;
  todo_list: string;
}

export interface TodoItemUpdate {
  title?: string;
  description?: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  assigned_to?: string | null;
}

export interface TodoListCreate {
  title: string;
  description: string;
}

export interface TodoListUpdate {
  title?: string;
  description?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Dashboard KPI types
export interface KPIData {
  title: any;
  value: any;
  delta: any;
  subtext: any;
  suffix?: string;
  prefix?: string;
  numberFormat?: string;
  sparkline?: any;
}