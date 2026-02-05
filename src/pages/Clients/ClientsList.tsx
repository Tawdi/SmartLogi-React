import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '../../hooks/useClients';
import { PageHeader } from '../../components/shared/PageHeader/PageHeader';
import { DataTable } from '../../components/shared/DataTable/DataTable';
import Button from '../../components/ui/Button/Button';
import { useModal } from '../../components/ui/Modal/useModal';
import ConfirmModal from '../../components/ui/Modal/ConfirmModal';
import ClientFormModal from './ClientFormModal';
import { clientService } from '../../services/client.service';
import type { ClientResponse, ClientRequest } from '../../types/api.types';

export default function ClientsList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { clients, loading, totalPages, refetch } = useClients({ page, size: 10 });

  const createModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();

  const [selectedClient, setSelectedClient] = useState<ClientResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: ClientRequest) => {
    setIsSubmitting(true);
    try {
      await clientService.create(data);
      await refetch();
      createModal.close();
    } catch (error: any) {
      console.error('Failed to create client:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: ClientRequest) => {
    if (!selectedClient) return;

    setIsSubmitting(true);
    try {
      await clientService.update(selectedClient.id, data);
      await refetch();
      editModal.close();
      setSelectedClient(null);
    } catch (error: any) {
      console.error('Failed to update client:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedClient) return;

    setIsSubmitting(true);
    try {
      await clientService.delete(selectedClient.id);
      await refetch();
      deleteModal.close();
      setSelectedClient(null);
    } catch (error) {
      console.error('Failed to delete client:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (client: ClientResponse, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedClient(client);
    editModal.open();
  };

  const handleDeleteClick = (client: ClientResponse, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedClient(client);
    deleteModal.open();
  };

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
    {
      key: 'actions',
      header: 'Actions',
      render: (client: ClientResponse) => (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleEditClick(client, e)}
            className="text-blue-500 hover:text-blue-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleDeleteClick(client, e)}
            className="text-red-500 hover:text-red-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
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
          <Button onClick={createModal.open}>
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

      {/* Create Modal */}
      <ClientFormModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onSubmit={handleCreate}
        isLoading={isSubmitting}
      />

      {/* Edit Modal */}
      <ClientFormModal
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        onSubmit={handleUpdate}
        client={selectedClient}
        isLoading={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDelete}
        title="Supprimer le client"
        message={`Êtes-vous sûr de vouloir supprimer le client "${selectedClient?.firstName} ${selectedClient?.lastName}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        isLoading={isSubmitting}
      />
    </div>
  );
}
