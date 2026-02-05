import { useState, useEffect } from 'react';
import { colisService } from '../services/colis.service';
import type { ColisResponse } from '../types/api.types';

interface UseColisParams {
  page?: number;
  size?: number;
}

export const useColis = ({ page = 0, size = 10 }: UseColisParams = {}) => {
  const [colis, setColis] = useState<ColisResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchColis();
  }, [page, size]);

  const fetchColis = async () => {
    try {
      setLoading(true);
      const response = await colisService.getAll({ page, size });
      setColis(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch parcels');
    } finally {
      setLoading(false);
    }
  };

  return {
    colis,
    loading,
    error,
    totalPages,
    totalElements,
    refetch: fetchColis
  };
};
