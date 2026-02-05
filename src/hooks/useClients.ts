import { useState, useEffect } from 'react';
import { clientService } from '../services/client.service';
import type { ClientResponse } from '../types/api.types';

interface UseClientsParams {
  page?: number;
  size?: number;
}

export const useClients = ({ page = 0, size = 10 }: UseClientsParams = {}) => {
  const [clients, setClients] = useState<ClientResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchClients();
  }, [page, size]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await clientService.getAll({ page, size });
      setClients(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  };

  return {
    clients,
    loading,
    error,
    totalPages,
    totalElements,
    refetch: fetchClients
  };
};
