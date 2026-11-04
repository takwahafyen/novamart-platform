/**
 * NovaMart Centralized API Client
 * Dynamically resolves API base URL from process.env.NEXT_PUBLIC_API_URL
 * Defaults to the production Render backend when no local environment variable is set.
 */

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'https://novamart-backend-yp4w.onrender.com/api'
).replace(/\/$/, '');

/**
 * Safely retrieve authentication token from localStorage
 */
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    const user = JSON.parse(userStr);
    return user.token || null;
  } catch {
    return null;
  }
};

/**
 * Core HTTP Request Wrapper
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const errorMessage = data?.message || (Array.isArray(data?.errors) ? data.errors.map(e => e.message).join(', ') : 'API request failed');
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // Auth endpoints
  auth: {
    login: (email, password) =>
      request('/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    register: ({ firstName, lastName, email, password }) =>
      request('/users/register', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
      }),

    getProfile: () => request('/users/profile'),
  },

  // Products
  products: {
    getAll: () => request('/products'),
    getById: (id) => request(`/products/${id}`),
    getByCategory: (category) => request(`/products/category/${category}`),
  },

  // Orders
  orders: {
    create: (orderData) =>
      request('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      }),
    getMyOrders: () => request('/orders/myorders'),
    getById: (id) => request(`/orders/${id}`),
  },

  // Categories
  categories: {
    getAll: () => request('/categories'),
  },

  // Health
  health: () => request('/health'),
};

export default api;
