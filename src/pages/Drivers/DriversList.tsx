import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrivers } from '../../hooks/useDrivers';
import { PageHeader } from '../../components/shared/PageHeader/PageHeader';
import { DataTable } from '../../components/shared/DataTable/DataTable';
import { Badge } from '../../components/ui/Badge/Badge';
import  Button  from '../../components/ui/Button/Button';
import type { DriverResponse } from '../../types/api.types';

export default function DriversList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { drivers, loading, totalPages } = useDrivers({ page, size: 10 });

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
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des Chauffeurs"
        description="Liste de tous les chauffeurs"
        action={
          <Button onClick={() => navigate('/dashboard/drivers/create')}>
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
    </div>
  );
}
