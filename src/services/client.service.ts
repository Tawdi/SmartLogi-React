import { apiClient } from '../config/api.config';
import type { ClientRequest, ClientResponse, RegisterClientRequest, Page, Pageable } from '../types/api.types';

export const clientService = {
  /**
   * Get all clients (paginated)
   */
  getAll: async (params?: Pageable): Promise<Page<ClientResponse>> => {
    const response = await apiClient.get<Page<ClientResponse>>('/api/clients', { params });
    return response.data;
  },

  /**
   * Get all clients (no pagination)
   */
  getAllNoPagination: async (): Promise<ClientResponse[]> => {
    const response = await apiClient.get<ClientResponse[]>('/api/clients/no-pagination');
    return response.data;
  },

  /**
   * Get client by ID
   */
  getById: async (id: string): Promise<ClientResponse> => {
    const response = await apiClient.get<ClientResponse>(`/api/clients/${id}`);
    return response.data;
  },

  /**
   * Search clients
   */
  search: async (query: string): Promise<ClientResponse[]> => {
    const response = await apiClient.get<ClientResponse[]>('/api/clients/search', {
      params: { q: query }
    });
    return response.data;
  },

  /**
   * Create a new client
   */
  create: async (data: ClientRequest): Promise<ClientResponse> => {
    const response = await apiClient.post<ClientResponse>('/api/clients', data);
    return response.data;
  },

  /**
   * Register a new client (public endpoint)
   */
  register: async (data: RegisterClientRequest): Promise<ClientResponse> => {
    const response = await apiClient.post<ClientResponse>('/api/clients/register', data);
    return response.data;
  },

  /**
   * Update an existing client
   */
  update: async (id: string, data: ClientRequest): Promise<ClientResponse> => {
    const response = await apiClient.put<ClientResponse>(`/api/clients/${id}`, data);
    return response.data;
  },

  /**
   * Delete a client
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/clients/${id}`);
  },
};
