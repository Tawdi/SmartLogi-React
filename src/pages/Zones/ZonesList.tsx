import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useZones } from '../../hooks/useZones';
import { PageHeader } from '../../components/shared/PageHeader/PageHeader';
import { DataTable } from '../../components/shared/DataTable/DataTable';
import Button from '../../components/ui/Button/Button';
import type { ZoneResponse } from '../../types/api.types';

export default function ZonesList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { zones, loading, totalPages } = useZones({ page, size: 10 });

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
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Zones de Livraison"
        description="Gestion des zones de livraison"
        action={
          <Button onClick={() => navigate('/dashboard/zones/create')}>
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
    </div>
  );
}
