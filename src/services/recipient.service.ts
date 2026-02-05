import { apiClient } from '../config/api.config';
import type { RecipientRequest, RecipientResponse, Page, Pageable } from '../types/api.types';

export const recipientService = {
  /**
   * Get all recipients (paginated)
   */
  getAll: async (params?: Pageable): Promise<Page<RecipientResponse>> => {
    const response = await apiClient.get<Page<RecipientResponse>>('/api/recipients', { params });
    return response.data;
  },

  /**
   * Get all recipients (no pagination)
   */
  getAllNoPagination: async (): Promise<RecipientResponse[]> => {
    const response = await apiClient.get<RecipientResponse[]>('/api/recipients/no-pagination');
    return response.data;
  },

  /**
   * Get recipient by ID
   */
  getById: async (id: string): Promise<RecipientResponse> => {
    const response = await apiClient.get<RecipientResponse>(`/api/recipients/${id}`);
    return response.data;
  },

  /**
   * Create a new recipient
   */
  create: async (data: RecipientRequest): Promise<RecipientResponse> => {
    const response = await apiClient.post<RecipientResponse>('/api/recipients', data);
    return response.data;
  },

  /**
   * Update an existing recipient
   */
  update: async (id: string, data: RecipientRequest): Promise<RecipientResponse> => {
    const response = await apiClient.put<RecipientResponse>(`/api/recipients/${id}`, data);
    return response.data;
  },

  /**
   * Delete a recipient
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/recipients/${id}`);
  },
};
