import { useState, useEffect } from 'react';
import { recipientService } from '../services/recipient.service';
import type { RecipientResponse } from '../types/api.types';

interface UseRecipientsParams {
  page?: number;
  size?: number;
}

export const useRecipients = ({ page = 0, size = 10 }: UseRecipientsParams = {}) => {
  const [recipients, setRecipients] = useState<RecipientResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchRecipients();
  }, [page, size]);

  const fetchRecipients = async () => {
    try {
      setLoading(true);
      const response = await recipientService.getAll({ page, size });
      setRecipients(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch recipients');
    } finally {
      setLoading(false);
    }
  };

  return {
    recipients,
    loading,
    error,
    totalPages,
    totalElements,
    refetch: fetchRecipients
  };
};
