import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrivers } from '../../hooks/useDrivers';
import { PageHeader } from '../../components/shared/PageHeader/PageHeader';
import { DataTable } from '../../components/shared/DataTable/DataTable';
import { Badge } from '../../components/ui/Badge/Badge';
import Button from '../../components/ui/Button/Button';
import { useModal } from '../../components/ui/Modal/useModal';
import ConfirmModal from '../../components/ui/Modal/ConfirmModal';
import DriverFormModal from './DriverFormModal';
import { driverService } from '../../services/driver.service';
import type { DriverResponse, DriverRequest } from '../../types/api.types';

export default function DriversList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { drivers, loading, totalPages, refetch } = useDrivers({ page, size: 10 });

  const createModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();

  const [selectedDriver, setSelectedDriver] = useState<DriverResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: DriverRequest) => {
    setIsSubmitting(true);
    try {
      await driverService.create(data);
      await refetch();
      createModal.close();
    } catch (error: any) {
      console.error('Failed to create driver:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: DriverRequest) => {
    if (!selectedDriver) return;

    setIsSubmitting(true);
    try {
      await driverService.update(selectedDriver.id, data);
      await refetch();
      editModal.close();
      setSelectedDriver(null);
    } catch (error: any) {
      console.error('Failed to update driver:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDriver) return;

    setIsSubmitting(true);
    try {
      await driverService.delete(selectedDriver.id);
      await refetch();
      deleteModal.close();
      setSelectedDriver(null);
    } catch (error) {
      console.error('Failed to delete driver:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (driver: DriverResponse, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDriver(driver);
    editModal.open();
  };

  const handleDeleteClick = (driver: DriverResponse, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDriver(driver);
    deleteModal.open();
  };

  const columns = [
    {
      key: 'firstName',
      header: 'Prénom',
      render: (driver: DriverResponse) => (
        <div className="font-medium text-foreground">{driver.firstName}</div>
      ),
    },
    {
      key: 'lastName',
      header: 'Nom',
      render: (driver: DriverResponse) => (
        <div className="font-medium text-foreground">{driver.lastName}</div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (driver: DriverResponse) => (
        <div className="text-foreground/70">{driver.email}</div>
      ),
    },
    {
      key: 'phoneNumber',
      header: 'Téléphone',
    },
    {
      key: 'vehicleType',
      header: 'Type de véhicule',
    },
    {
      key: 'status',
      header: 'Statut',
      render: (driver: DriverResponse) => (
        <Badge variant={driver.status === 'ACTIVE' ? 'success' : 'default'}>
          {driver.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (driver: DriverResponse) => (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleEditClick(driver, e)}
            className="text-blue-500 hover:text-blue-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleDeleteClick(driver, e)}
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
        title="Gestion des Chauffeurs"
        description="Liste de tous les chauffeurs"
        action={
          <Button onClick={createModal.open}>
            Ajouter un chauffeur
          </Button>
        }
      />

      <DataTable
        data={drivers}
        columns={columns}
        onRowClick={(driver) => navigate(`/dashboard/drivers/${driver.id}`)}
        isLoading={loading}
        emptyMessage="Aucun chauffeur trouvé"
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
      <DriverFormModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onSubmit={handleCreate}
        isLoading={isSubmitting}
      />

      {/* Edit Modal */}
      <DriverFormModal
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        onSubmit={handleUpdate}
        driver={selectedDriver}
        isLoading={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDelete}
        title="Supprimer le chauffeur"
        message={`Êtes-vous sûr de vouloir supprimer le chauffeur "${selectedDriver?.firstName} ${selectedDriver?.lastName}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        isLoading={isSubmitting}
      />
    </div>
  );
}
