import { useState, useEffect } from 'react';
import { zoneService } from '../services/zone.service';
import type { ZoneResponse } from '../types/api.types';

interface UseZonesParams {
  page?: number;
  size?: number;
}

export const useZones = ({ page = 0, size = 10 }: UseZonesParams = {}) => {
  const [zones, setZones] = useState<ZoneResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchZones();
  }, [page, size]);

  const fetchZones = async () => {
    try {
      setLoading(true);
      const response = await zoneService.getAll({ page, size });
      setZones(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch zones');
    } finally {
      setLoading(false);
    }
  };

  return {
    zones,
    loading,
    error,
    totalPages,
    totalElements,
    refetch: fetchZones
  };
};
