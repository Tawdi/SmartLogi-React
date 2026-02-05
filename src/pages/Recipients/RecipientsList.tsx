import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipientService } from '../../services';
import { PageHeader } from '../../components/shared/PageHeader/PageHeader';
import { DataTable } from '../../components/shared/DataTable/DataTable';
import  Button  from '../../components/ui/Button/Button';
import type { RecipientResponse } from '../../types/api.types';

export default function RecipientsList() {
  const navigate = useNavigate();
  const [recipients, setRecipients] = useState<RecipientResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadRecipients();
  }, [page]);

  const loadRecipients = async () => {
    try {
      setLoading(true);
      const response = await recipientService.getAll({ page, size: 10 });
      setRecipients(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Failed to load recipients:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'firstName',
      header: 'Prénom',
      render: (recipient: RecipientResponse) => (
        <div className="font-medium text-foreground">{recipient.firstName}</div>
      ),
    },
    {
      key: 'lastName',
      header: 'Nom',
      render: (recipient: RecipientResponse) => (
        <div className="font-medium text-foreground">{recipient.lastName}</div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (recipient: RecipientResponse) => (
        <div className="text-foreground/70">{recipient.email}</div>
      ),
    },
    {
      key: 'phoneNumber',
      header: 'Téléphone',
    },
    {
      key: 'ville',
      header: 'Ville',
    },
    {
      key: 'codePostal',
      header: 'Code Postal',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des Destinataires"
        description="Liste de tous les destinataires"
        action={
          <Button onClick={() => navigate('/dashboard/recipients/create')}>
            Ajouter un destinataire
          </Button>
        }
      />

      <DataTable
        data={recipients}
        columns={columns}
        onRowClick={(recipient) => navigate(`/dashboard/recipients/${recipient.id}`)}
        isLoading={loading}
        emptyMessage="Aucun destinataire trouvé"
      />

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            Précédent
          </Button>
          <span className="flex items-center px-4 text-sm text-foreground/70">
            Page {page + 1} sur {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
}
