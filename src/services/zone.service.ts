import { apiClient } from '../config/api.config';
import type { ZoneRequest, ZoneResponse, Page, Pageable } from '../types/api.types';

export const zoneService = {
  /**
   * Get all zones (paginated)
   */
  getAll: async (params?: Pageable): Promise<Page<ZoneResponse>> => {
    const response = await apiClient.get<Page<ZoneResponse>>('/api/zones', { params });
    return response.data;
  },

  /**
   * Get all zones (no pagination)
   */
  getAllNoPagination: async (): Promise<ZoneResponse[]> => {
    const response = await apiClient.get<ZoneResponse[]>('/api/zones/no-pagination');
    return response.data;
  },

  /**
   * Get zone by ID
   */
  getById: async (id: string): Promise<ZoneResponse> => {
    const response = await apiClient.get<ZoneResponse>(`/api/zones/${id}`);
    return response.data;
  },

  /**
   * Create a new zone
   */
  create: async (data: ZoneRequest): Promise<ZoneResponse> => {
    const response = await apiClient.post<ZoneResponse>('/api/zones', data);
    return response.data;
  },

  /**
   * Update an existing zone
   */
  update: async (id: string, data: ZoneRequest): Promise<ZoneResponse> => {
    const response = await apiClient.put<ZoneResponse>(`/api/zones/${id}`, data);
    return response.data;
  },

  /**
   * Delete a zone
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/zones/${id}`);
  },
};
