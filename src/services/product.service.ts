import { apiClient } from '../config/api.config';
import type { ProductRequest, ProductResponse, Page, Pageable } from '../types/api.types';

export const productService = {
  /**
   * Get all products (paginated)
   */
  getAll: async (params?: Pageable): Promise<Page<ProductResponse>> => {
    const response = await apiClient.get<Page<ProductResponse>>('/api/products', { params });
    return response.data;
  },

  /**
   * Get all products (no pagination)
   */
  getAllNoPagination: async (): Promise<ProductResponse[]> => {
    const response = await apiClient.get<ProductResponse[]>('/api/products/no-pagination');
    return response.data;
  },

  /**
   * Get product by ID
   */
  getById: async (id: string): Promise<ProductResponse> => {
    const response = await apiClient.get<ProductResponse>(`/api/products/${id}`);
    return response.data;
  },

  /**
   * Create a new product
   */
  create: async (data: ProductRequest): Promise<ProductResponse> => {
    const response = await apiClient.post<ProductResponse>('/api/products', data);
    return response.data;
  },

  /**
   * Update an existing product
   */
  update: async (id: string, data: ProductRequest): Promise<ProductResponse> => {
    const response = await apiClient.put<ProductResponse>(`/api/products/${id}`, data);
    return response.data;
  },

  /**
   * Delete a product
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/products/${id}`);
  },
};
