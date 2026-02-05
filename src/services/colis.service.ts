import { apiClient } from '../config/api.config';
import type {
  ColisRequest,
  ColisResponse,
  ColisProductResponse,
  UpdateStatusRequest,
  AssignerLivreurRequest,
  HistoriqueLivraisonResponse,
  SyntheseDTO,
  Page,
  Pageable,
  ColisStatus,
  Priorite,
} from '../types/api.types';

export const colisService = {
  /**
   * Get all parcels (paginated)
   */
  getAll: async (params?: Pageable): Promise<Page<ColisResponse>> => {
    const response = await apiClient.get<Page<ColisResponse>>('/api/colis', { params });
    return response.data;
  },

  /**
   * Get all parcels (no pagination)
   */
  getAllNoPagination: async (): Promise<ColisResponse[]> => {
    const response = await apiClient.get<ColisResponse[]>('/api/colis/no-pagination');
    return response.data;
  },

  /**
   * Get parcel by ID
   */
  getById: async (id: string): Promise<ColisResponse> => {
    const response = await apiClient.get<ColisResponse>(`/api/colis/${id}`);
    return response.data;
  },

  /**
   * Get products for a parcel
   */
  getProducts: async (id: string, params?: Pageable): Promise<Page<ColisProductResponse>> => {
    const response = await apiClient.get<Page<ColisProductResponse>>(`/api/colis/${id}/products`, { params });
    return response.data;
  },

  /**
   * Get history for a parcel
   */
  getHistory: async (id: string, params?: Pageable): Promise<Page<HistoriqueLivraisonResponse>> => {
    const response = await apiClient.get<Page<HistoriqueLivraisonResponse>>(`/api/colis/${id}/history`, { params });
    return response.data;
  },

  /**
   * Get parcels for a client (expediteur)
   */
  getByClient: async (
    expediteurId: string,
    status?: ColisStatus,
    params?: Pageable
  ): Promise<Page<ColisResponse>> => {
    const response = await apiClient.get<Page<ColisResponse>>(
      `/api/colis/client/${expediteurId}`,
      { params: { ...params, status } }
    );
    return response.data;
  },

  /**
   * Get parcels for a driver (livreur)
   */
  getByDriver: async (
    livreurId: string,
    status?: ColisStatus,
    params?: Pageable
  ): Promise<Page<ColisResponse>> => {
    const response = await apiClient.get<Page<ColisResponse>>(
      `/api/colis/driver/${livreurId}`,
      { params: { ...params, status } }
    );
    return response.data;
  },

  /**
   * Get parcels for a recipient (destinataire)
   */
  getByDestinataire: async (
    destinataireId: string,
    status?: ColisStatus,
    params?: Pageable
  ): Promise<Page<ColisResponse>> => {
    const response = await apiClient.get<Page<ColisResponse>>(
      `/api/colis/destinataire/${destinataireId}`,
      { params: { ...params, status } }
    );
    return response.data;
  },

  /**
   * Create a new parcel
   */
  create: async (data: ColisRequest): Promise<ColisResponse> => {
    const response = await apiClient.post<ColisResponse>('/api/colis', data);
    return response.data;
  },

  /**
   * Update an existing parcel
   */
  update: async (id: string, data: ColisRequest): Promise<ColisResponse> => {
    const response = await apiClient.put<ColisResponse>(`/api/colis/${id}`, data);
    return response.data;
  },

  /**
   * Update parcel status (livreur only)
   */
  updateStatus: async (id: string, data: UpdateStatusRequest): Promise<ColisResponse> => {
    const response = await apiClient.put<ColisResponse>(`/api/colis/${id}/status`, data);
    return response.data;
  },

  /**
   * Assign a driver to a parcel (manager only)
   */
  assignDriver: async (id: string, data: AssignerLivreurRequest): Promise<ColisResponse> => {
    const response = await apiClient.put<ColisResponse>(`/api/colis/${id}/assign`, data);
    return response.data;
  },

  /**
   * Delete a parcel
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/colis/${id}`);
  },

  // Synthesis endpoints
  /**
   * Get synthesis by status
   */
  getSynthesisByStatus: async (): Promise<SyntheseDTO<ColisStatus>[]> => {
    const response = await apiClient.get<SyntheseDTO<ColisStatus>[]>('/api/colis/synthese/statut');
    return response.data;
  },

  /**
   * Get synthesis by zone
   */
  getSynthesisByZone: async (): Promise<SyntheseDTO<string>[]> => {
    const response = await apiClient.get<SyntheseDTO<string>[]>('/api/colis/synthese/zone');
    return response.data;
  },

  /**
   * Get synthesis by priority
   */
  getSynthesisByPriority: async (): Promise<SyntheseDTO<Priorite>[]> => {
    const response = await apiClient.get<SyntheseDTO<Priorite>[]>('/api/colis/synthese/priorite');
    return response.data;
  },
};
