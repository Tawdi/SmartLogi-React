import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '../../hooks/useClients';
import { PageHeader } from '../../components/shared/PageHeader/PageHeader';
import { DataTable } from '../../components/shared/DataTable/DataTable';
import Button from '../../components/ui/Button/Button';
import type { ClientResponse } from '../../types/api.types';

export default function ClientsList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { clients, loading, totalPages } = useClients({ page, size: 10 });

  const columns = [
    {
      key: 'firstName',
      header: 'Prénom',
      render: (client: ClientResponse) => (
        <div className="font-medium text-foreground">{client.firstName}</div>
      ),
    },
    {
      key: 'lastName',
      header: 'Nom',
      render: (client: ClientResponse) => (
        <div className="font-medium text-foreground">{client.lastName}</div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (client: ClientResponse) => (
        <div className="text-foreground/70">{client.email}</div>
      ),
    },
    {
      key: 'phoneNumber',
      header: 'Téléphone',
    },
    {
      key: 'rue',
      header: 'Adresse',
      render: (client: ClientResponse) => (
        <div className="text-foreground/70">
          {client.rue || 'N/A'}
        </div>
      ),
    },
    {
      key: 'ville',
      header: 'Ville',
      render: (client: ClientResponse) => (
        <div className="text-foreground/70">
          {client.codePostal} {client.ville}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des Clients"
        description="Liste de tous les clients"
        action={
          <Button onClick={() => navigate('/dashboard/clients/create')}>
            Ajouter un client
          </Button>
        }
      />

      <DataTable
        data={clients}
        columns={columns}
        onRowClick={(client) => navigate(`/dashboard/clients/${client.id}`)}
        isLoading={loading}
        emptyMessage="Aucun client trouvé"
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
