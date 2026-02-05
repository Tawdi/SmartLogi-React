import { PageHeader } from '../../components/shared/PageHeader/PageHeader';
import Button from '../../components/ui/Button/Button';

export default function DeliveriesList() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Livraisons"
        description="Gestion des livraisons en cours"
        action={
          <Button onClick={() => alert('Fonctionnalité à venir')}>
            Nouvelle livraison
          </Button>
        }
      />

      <div className="bg-card border border-foreground/10 rounded-lg p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-foreground/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-foreground">
          Gestion des livraisons
        </h3>
        <p className="mt-2 text-sm text-foreground/60">
          Cette fonctionnalité sera disponible prochainement.
          <br />
          Vous pourrez gérer et suivre toutes vos livraisons ici.
        </p>
      </div>
    </div>
  );
}
