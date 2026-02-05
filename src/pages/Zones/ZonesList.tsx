import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useZones } from '../../hooks/useZones';
import { PageHeader } from '../../components/shared/PageHeader/PageHeader';
import { DataTable } from '../../components/shared/DataTable/DataTable';
import Button from '../../components/ui/Button/Button';
import { useModal } from '../../components/ui/Modal/useModal';
import ConfirmModal from '../../components/ui/Modal/ConfirmModal';
import ZoneFormModal from './ZoneFormModal';
import { zoneService } from '../../services/zone.service';
import type { ZoneResponse, ZoneRequest } from '../../types/api.types';

export default function ZonesList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { zones, loading, totalPages, refetch } = useZones({ page, size: 10 });

  const createModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();

  const [selectedZone, setSelectedZone] = useState<ZoneResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: ZoneRequest) => {
    setIsSubmitting(true);
    try {
      await zoneService.create(data);
      await refetch();
      createModal.close();
    } catch (error: any) {
      console.error('Failed to create zone:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: ZoneRequest) => {
    if (!selectedZone) return;

    setIsSubmitting(true);
    try {
      await zoneService.update(selectedZone.id, data);
      await refetch();
      editModal.close();
      setSelectedZone(null);
    } catch (error: any) {
      console.error('Failed to update zone:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedZone) return;

    setIsSubmitting(true);
    try {
      await zoneService.delete(selectedZone.id);
      await refetch();
      deleteModal.close();
      setSelectedZone(null);
    } catch (error) {
      console.error('Failed to delete zone:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (zone: ZoneResponse, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedZone(zone);
    editModal.open();
  };

  const handleDeleteClick = (zone: ZoneResponse, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedZone(zone);
    deleteModal.open();
  };

  const columns = [
    {
      key: 'name',
      header: 'Nom',
      render: (zone: ZoneResponse) => (
        <div className="font-medium text-foreground">{zone.name}</div>
      ),
    },
    {
      key: 'codePostal',
      header: 'Code Postal',
      render: (zone: ZoneResponse) => (
        <div className="text-foreground/70">{zone.codePostal}</div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (zone: ZoneResponse) => (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleEditClick(zone, e)}
            className="text-blue-500 hover:text-blue-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleDeleteClick(zone, e)}
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
        title="Zones de Livraison"
        description="Gestion des zones de livraison"
        action={
          <Button onClick={createModal.open}>
            Ajouter une zone
          </Button>
        }
      />

      <DataTable
        data={zones}
        columns={columns}
        onRowClick={(zone) => navigate(`/dashboard/zones/${zone.id}`)}
        isLoading={loading}
        emptyMessage="Aucune zone trouvée"
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

      <ZoneFormModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onSubmit={handleCreate}
        isLoading={isSubmitting}
      />

      <ZoneFormModal
        isOpen={editModal.isOpen}
        onClose={() => {
          editModal.close();
          setSelectedZone(null);
        }}
        onSubmit={handleUpdate}
        zone={selectedZone}
        isLoading={isSubmitting}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => {
          deleteModal.close();
          setSelectedZone(null);
        }}
        onConfirm={handleDelete}
        title="Supprimer la zone"
        message={`Êtes-vous sûr de vouloir supprimer la zone "${selectedZone?.name}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
}
