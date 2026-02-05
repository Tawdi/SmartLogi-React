import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipientService } from '../../services';
import { PageHeader } from '../../components/shared/PageHeader/PageHeader';
import { DataTable } from '../../components/shared/DataTable/DataTable';
import Button from '../../components/ui/Button/Button';
import { useModal } from '../../components/ui/Modal/useModal';
import ConfirmModal from '../../components/ui/Modal/ConfirmModal';
import RecipientFormModal from './RecipientFormModal';
import type { RecipientResponse, RecipientRequest } from '../../types/api.types';

export default function RecipientsList() {
  const navigate = useNavigate();
  const [recipients, setRecipients] = useState<RecipientResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const createModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();

  const [selectedRecipient, setSelectedRecipient] = useState<RecipientResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleCreate = async (data: RecipientRequest) => {
    setIsSubmitting(true);
    try {
      await recipientService.create(data);
      await loadRecipients();
      createModal.close();
    } catch (error: any) {
      console.error('Failed to create recipient:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: RecipientRequest) => {
    if (!selectedRecipient) return;

    setIsSubmitting(true);
    try {
      await recipientService.update(selectedRecipient.id, data);
      await loadRecipients();
      editModal.close();
      setSelectedRecipient(null);
    } catch (error: any) {
      console.error('Failed to update recipient:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRecipient) return;

    setIsSubmitting(true);
    try {
      await recipientService.delete(selectedRecipient.id);
      await loadRecipients();
      deleteModal.close();
      setSelectedRecipient(null);
    } catch (error) {
      console.error('Failed to delete recipient:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (recipient: RecipientResponse, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRecipient(recipient);
    editModal.open();
  };

  const handleDeleteClick = (recipient: RecipientResponse, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRecipient(recipient);
    deleteModal.open();
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
    {
      key: 'actions',
      header: 'Actions',
      render: (recipient: RecipientResponse) => (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleEditClick(recipient, e)}
            className="text-blue-500 hover:text-blue-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleDeleteClick(recipient, e)}
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
        title="Gestion des Destinataires"
        description="Liste de tous les destinataires"
        action={
          <Button onClick={createModal.open}>
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

      {/* Create Modal */}
      <RecipientFormModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onSubmit={handleCreate}
        isLoading={isSubmitting}
      />

      {/* Edit Modal */}
      <RecipientFormModal
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        onSubmit={handleUpdate}
        recipient={selectedRecipient}
        isLoading={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDelete}
        title="Supprimer le destinataire"
        message={`Êtes-vous sûr de vouloir supprimer le destinataire "${selectedRecipient?.firstName} ${selectedRecipient?.lastName}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        isLoading={isSubmitting}
      />
    </div>
  );
}
