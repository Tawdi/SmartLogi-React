import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { colisService } from '../../services';
import { PageHeader } from '../../components/shared/PageHeader/PageHeader';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import Button from '../../components/ui/Button/Button';
import { useModal } from '../../components/ui/Modal/useModal';
import ConfirmModal from '../../components/ui/Modal/ConfirmModal';
import ParcelFormModal from './ParcelFormModal';
import type { ColisResponse, ColisRequest, HistoriqueLivraisonResponse, ColisStatus, Priorite } from '../../types/api.types';

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

export default function ParcelDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [parcel, setParcel] = useState<ColisResponse | null>(null);
  const [history, setHistory] = useState<HistoriqueLivraisonResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const editModal = useModal();
  const deleteModal = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      loadParcelData();
    }
  }, [id]);

  const loadParcelData = async () => {
    try {
      setLoading(true);
      const [parcelData, historyData] = await Promise.all([
        colisService.getById(id!),
        colisService.getHistory(id!),
      ]);
      setParcel(parcelData);
      setHistory(historyData.content);
    } catch (error) {
      console.error('Failed to load parcel:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update parcel
  const handleUpdate = async (data: ColisRequest) => {
    if (!id) return;

    setIsSubmitting(true);
    try {
      await colisService.update(id, data);
      await loadParcelData(); // Reload parcel data
      editModal.close();
    } catch (error: any) {
      console.error('Failed to update parcel:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete parcel
  const handleDelete = async () => {
    if (!id) return;

    setIsSubmitting(true);
    try {
      await colisService.delete(id);
      navigate('/dashboard/parcels');
    } catch (error) {
      console.error('Failed to delete parcel:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!parcel) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/60">Colis non trouvé</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Colis ${parcel.reference}`}
        description="Détails du colis"
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/dashboard/parcels')}>
              Retour
            </Button>
            <Button variant="outline" onClick={editModal.open}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier
            </Button>
            <Button variant="danger" onClick={deleteModal.open}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Supprimer
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informations générales */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Informations générales</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-foreground/60">Statut:</span>
                <Badge variant={statusVariants[parcel.statut]}>{parcel.statut}</Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-foreground/60">Priorité:</span>
                <Badge variant={priorityVariants[parcel.priorite]}>{parcel.priorite}</Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-foreground/60">Poids:</span>
                <span className="font-medium">{parcel.poids} kg</span>
              </div>

              <div className="flex justify-between">
                <span className="text-foreground/60">Zone:</span>
                <span className="font-medium">{parcel.zone.name}</span>
              </div>

              {parcel.description && (
                <div>
                  <span className="text-foreground/60">Description:</span>
                  <p className="mt-1">{parcel.description}</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Expéditeur */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Expéditeur</h2>

            <div className="space-y-3">
              <div>
                <span className="text-foreground/60">Nom:</span>
                <p className="font-medium">{parcel.expediteur.firstName} {parcel.expediteur.lastName}</p>
              </div>

              <div>
                <span className="text-foreground/60">Email:</span>
                <p>{parcel.expediteur.email}</p>
              </div>

              <div>
                <span className="text-foreground/60">Téléphone:</span>
                <p>{parcel.expediteur.phoneNumber}</p>
              </div>

              <div>
                <span className="text-foreground/60">Adresse:</span>
                <p>{parcel.expediteur.rue}, {parcel.expediteur.ville} {parcel.expediteur.codePostal}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Destinataire */}
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Destinataire</h2>

            <div className="space-y-3">
              <div>
                <span className="text-foreground/60">Nom:</span>
                <p className="font-medium">{parcel.destinataire.firstName} {parcel.destinataire.lastName}</p>
              </div>

              <div>
                <span className="text-foreground/60">Email:</span>
                <p>{parcel.destinataire.email}</p>
              </div>

              <div>
                <span className="text-foreground/60">Téléphone:</span>
                <p>{parcel.destinataire.phoneNumber}</p>
              </div>

              <div>
                <span className="text-foreground/60">Adresse de livraison:</span>
                <p>{parcel.adresseLivraison.rue}, {parcel.adresseLivraison.ville} {parcel.adresseLivraison.codePostal}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Chauffeur */}
        {parcel.livreur && (
          <Card>
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Chauffeur assigné</h2>

              <div className="space-y-3">
                <div>
                  <span className="text-foreground/60">Nom:</span>
                  <p className="font-medium">{parcel.livreur.firstName} {parcel.livreur.lastName}</p>
                </div>

                <div>
                  <span className="text-foreground/60">Email:</span>
                  <p>{parcel.livreur.email}</p>
                </div>

                <div>
                  <span className="text-foreground/60">Téléphone:</span>
                  <p>{parcel.livreur.phoneNumber}</p>
                </div>

                <div>
                  <span className="text-foreground/60">Véhicule:</span>
                  <p>{parcel.livreur.vehicleType}</p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Produits */}
      {parcel.products && parcel.products.length > 0 && (
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Produits ({parcel.products.length})</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left">Produit</th>
                    <th className="px-4 py-2 text-left">Catégorie</th>
                    <th className="px-4 py-2 text-right">Quantité</th>
                    <th className="px-4 py-2 text-right">Prix unitaire</th>
                    <th className="px-4 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {parcel.products.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3">{item.product.name}</td>
                      <td className="px-4 py-3">{item.product.category}</td>
                      <td className="px-4 py-3 text-right">{item.quantite}</td>
                      <td className="px-4 py-3 text-right">{item.prix.toFixed(2)} DH</td>
                      <td className="px-4 py-3 text-right font-medium">
                        {(item.quantite * item.prix).toFixed(2)} DH
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      )}

      {/* Historique */}
      {history.length > 0 && (
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Historique</h2>

            <div className="space-y-3">
              {history.map((entry) => (
                <div key={entry.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={statusVariants[entry.statut]}>{entry.statut}</Badge>
                      <span className="text-sm text-foreground/60">
                        {new Date(entry.createdAt).toLocaleString('fr-FR')}
                      </span>
                    </div>
                    {entry.commentaire && (
                      <p className="mt-1 text-sm text-foreground/70">{entry.commentaire}</p>
                    )}
                    <p className="mt-1 text-xs text-foreground/50">Par: {entry.utilisateur}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Edit Modal */}
      <ParcelFormModal
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        onSubmit={handleUpdate}
        parcel={parcel}
        isLoading={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDelete}
        title="Supprimer le colis"
        message={`Êtes-vous sûr de vouloir supprimer le colis "${parcel.reference}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
}
