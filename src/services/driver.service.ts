import { apiClient } from '../config/api.config';
import type { DriverRequest, DriverResponse, Page, Pageable } from '../types/api.types';

export const driverService = {
  /**
   * Get all drivers (paginated)
   */
  getAll: async (params?: Pageable): Promise<Page<DriverResponse>> => {
    const response = await apiClient.get<Page<DriverResponse>>('/api/drivers', { params });
    return response.data;
  },

  /**
   * Get all drivers (no pagination)
   */
  getAllNoPagination: async (): Promise<DriverResponse[]> => {
    const response = await apiClient.get<DriverResponse[]>('/api/drivers/no-pagination');
    return response.data;
  },

  /**
   * Get driver by ID
   */
  getById: async (id: string): Promise<DriverResponse> => {
    const response = await apiClient.get<DriverResponse>(`/api/drivers/${id}`);
    return response.data;
  },

  /**
   * Create a new driver
   */
  create: async (data: DriverRequest): Promise<DriverResponse> => {
    const response = await apiClient.post<DriverResponse>('/api/drivers', data);
    return response.data;
  },

  /**
   * Update an existing driver
   */
  update: async (id: string, data: DriverRequest): Promise<DriverResponse> => {
    const response = await apiClient.put<DriverResponse>(`/api/drivers/${id}`, data);
    return response.data;
  },

  /**
   * Delete a driver
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/drivers/${id}`);
  },
};
