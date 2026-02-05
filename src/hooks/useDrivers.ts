import { useState, useEffect } from 'react';
import { driverService } from '../services/driver.service';
import type { DriverResponse } from '../types/api.types';

interface UseDriversParams {
  page?: number;
  size?: number;
}

export const useDrivers = ({ page = 0, size = 10 }: UseDriversParams = {}) => {
  const [drivers, setDrivers] = useState<DriverResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchDrivers();
  }, [page, size]);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await driverService.getAll({ page, size });
      setDrivers(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch drivers');
    } finally {
      setLoading(false);
    }
  };

  return {
    drivers,
    loading,
    error,
    totalPages,
    totalElements,
    refetch: fetchDrivers
  };
};
