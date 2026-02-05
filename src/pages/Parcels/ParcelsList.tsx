import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColis } from '../../hooks/useColis';
import { PageHeader } from '../../components/shared/PageHeader/PageHeader';
import { DataTable } from '../../components/shared/DataTable/DataTable';
import { Badge } from '../../components/ui/Badge/Badge';
import Button from '../../components/ui/Button/Button';
import { useModal } from '../../components/ui/Modal/useModal';
import ConfirmModal from '../../components/ui/Modal/ConfirmModal';
import ParcelFormModal from './ParcelFormModal';
import { colisService } from '../../services/colis.service';
import type { ColisResponse, ColisRequest, ColisStatus, Priorite } from '../../types/api.types';

const statusVariants: Record<ColisStatus, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  CREATED: 'default',
  COLLECTED: 'info',
  IN_STOCK: 'warning',
  IN_TRANSIT: 'info',
  DELIVERED: 'success',
};

const priorityVariants: Record<Priorite, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  LOW: 'default',
  MEDIUM: 'info',
  HIGH: 'warning',
  URGENT: 'danger',
};

export default function ParcelsList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { colis, loading, totalPages, refetch } = useColis({ page, size: 10 });

  // Modal states
  const createModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();

  const [selectedParcel, setSelectedParcel] = useState<ColisResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create parcel
  const handleCreate = async (data: ColisRequest) => {
    setIsSubmitting(true);
    try {
      await colisService.create(data);
      await refetch();
      createModal.close();
    } catch (error: any) {
      console.error('Failed to create parcel:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update parcel
  const handleUpdate = async (data: ColisRequest) => {
    if (!selectedParcel) return;

    setIsSubmitting(true);
    try {
      await colisService.update(selectedParcel.id, data);
      await refetch();
      editModal.close();
      setSelectedParcel(null);
    } catch (error: any) {
      console.error('Failed to update parcel:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete parcel
  const handleDelete = async () => {
    if (!selectedParcel) return;

    setIsSubmitting(true);
    try {
      await colisService.delete(selectedParcel.id);
      await refetch();
      deleteModal.close();
      setSelectedParcel(null);
    } catch (error) {
      console.error('Failed to delete parcel:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open edit modal
  const handleEditClick = (parcel: ColisResponse, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    setSelectedParcel(parcel);
    editModal.open();
  };

  // Open delete modal
  const handleDeleteClick = (parcel: ColisResponse, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    setSelectedParcel(parcel);
    deleteModal.open();
  };

  const columns = [
    {
      key: 'reference',
      header: 'Référence',
      render: (parcel: ColisResponse) => (
        <div className="font-medium text-foreground">{parcel.reference}</div>
      ),
    },
    {
      key: 'expediteur',
      header: 'Expéditeur',
      render: (parcel: ColisResponse) => (
        <div className="text-foreground/70">
          {parcel.expediteur.firstName} {parcel.expediteur.lastName}
        </div>
      ),
    },
    {
      key: 'destinataire',
      header: 'Destinataire',
      render: (parcel: ColisResponse) => (
        <div className="text-foreground/70">
          {parcel.destinataire.firstName} {parcel.destinataire.lastName}
        </div>
      ),
    },
    {
      key: 'zone',
      header: 'Zone',
      render: (parcel: ColisResponse) => parcel.zone.name,
    },
    {
      key: 'statut',
      header: 'Statut',
      render: (parcel: ColisResponse) => (
        <Badge variant={statusVariants[parcel.statut]}>
          {parcel.statut}
        </Badge>
      ),
    },
    {
      key: 'priorite',
      header: 'Priorité',
      render: (parcel: ColisResponse) => (
        <Badge variant={priorityVariants[parcel.priorite]}>
          {parcel.priorite}
        </Badge>
      ),
    },
    {
      key: 'poids',
      header: 'Poids',
      render: (parcel: ColisResponse) => `${parcel.poids} kg`,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (parcel: ColisResponse) => (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleEditClick(parcel, e)}
            className="text-blue-500 hover:text-blue-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleDeleteClick(parcel, e)}
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
        title="Gestion des Colis"
        description="Liste de tous les colis"
        action={
          <Button onClick={createModal.open}>
            Créer un colis
          </Button>
        }
      />

      <DataTable
        data={colis}
        columns={columns}
        onRowClick={(parcel) => navigate(`/dashboard/parcels/${parcel.id}`)}
        isLoading={loading}
        emptyMessage="Aucun colis trouvé"
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
      <ParcelFormModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onSubmit={handleCreate}
        isLoading={isSubmitting}
      />

      {/* Edit Modal */}
      <ParcelFormModal
        isOpen={editModal.isOpen}
        onClose={() => {
          editModal.close();
          setSelectedParcel(null);
        }}
        onSubmit={handleUpdate}
        parcel={selectedParcel}
        isLoading={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => {
          deleteModal.close();
          setSelectedParcel(null);
        }}
        onConfirm={handleDelete}
        title="Supprimer le colis"
        message={`Êtes-vous sûr de vouloir supprimer le colis "${selectedParcel?.reference}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
}

