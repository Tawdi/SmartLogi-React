import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal/Modal';
import { FormField } from '../../components/shared/FormField/FormField';
import Input from '../../components/ui/Input/Input';
import { Select } from '../../components/ui/Select/Select';
import { Textarea } from '../../components/ui/Textarea/Textarea';
import Button from '../../components/ui/Button/Button';
import { useClients } from '../../hooks/useClients';
import { useZones } from '../../hooks/useZones';
import type { ColisRequest, ColisResponse, Priorite } from '../../types/api.types';

interface ParcelFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ColisRequest) => Promise<void>;
  parcel?: ColisResponse | null;
  isLoading?: boolean;
}

const PRIORITE_OPTIONS = [
  { value: 'LOW', label: 'Basse' },
  { value: 'MEDIUM', label: 'Moyenne' },
  { value: 'HIGH', label: 'Haute' },
  { value: 'URGENT', label: 'Urgente' },
];

export default function ParcelFormModal({
  isOpen,
  onClose,
  onSubmit,
  parcel,
  isLoading = false,
}: ParcelFormModalProps) {
  const { clients } = useClients({ page: 0, size: 100 });
  const { zones } = useZones({ page: 0, size: 100 });

  const [formData, setFormData] = useState<ColisRequest>({
    reference: '',
    poids: 0,
    description: '',
    priorite: 'MEDIUM' as Priorite,
    expediteurId: '',
    destinataireId: '',
    zoneId: '',
    ville: '',
    rue: '',
    codePostal: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when editing
  useEffect(() => {
    if (parcel && isOpen) {
      setFormData({
        reference: parcel.reference || '',
        poids: parcel.poids || 0,
        description: parcel.description || '',
        priorite: parcel.priorite || 'MEDIUM',
        expediteurId: parcel.expediteur?.id || '',
        destinataireId: parcel.destinataire?.id || '',
        zoneId: parcel.zone?.id || '',
        ville: parcel.adresseLivraison?.ville || '',
        rue: parcel.adresseLivraison?.rue || '',
        codePostal: parcel.adresseLivraison?.codePostal || '',
      });
    } else if (!isOpen) {
      // Reset form when modal closes
      setFormData({
        reference: '',
        poids: 0,
        description: '',
        priorite: 'MEDIUM' as Priorite,
        expediteurId: '',
        destinataireId: '',
        zoneId: '',
        ville: '',
        rue: '',
        codePostal: '',
      });
      setErrors({});
    }
  }, [parcel, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'poids' ? parseFloat(value) || 0 : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.reference?.trim()) {
      newErrors.reference = 'La référence est obligatoire';
    }
    if (!formData.poids || formData.poids <= 0) {
      newErrors.poids = 'Le poids doit être supérieur à 0';
    }
    if (!formData.expediteurId) {
      newErrors.expediteurId = 'L\'expéditeur est obligatoire';
    }
    if (!formData.destinataireId) {
      newErrors.destinataireId = 'Le destinataire est obligatoire';
    }
    if (!formData.zoneId) {
      newErrors.zoneId = 'La zone est obligatoire';
    }
    if (!formData.ville?.trim()) {
      newErrors.ville = 'La ville est obligatoire';
    }
    if (!formData.rue?.trim()) {
      newErrors.rue = 'La rue est obligatoire';
    }
    if (!formData.codePostal?.trim()) {
      newErrors.codePostal = 'Le code postal est obligatoire';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (error: any) {
      console.error('Form submission error:', error);
      setErrors({ submit: error.message || 'Une erreur est survenue' });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={parcel ? 'Modifier le colis' : 'Nouveau colis'}
      size="xl"
      showFooter
      footerContent={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} isLoading={isLoading}>
            {parcel ? 'Mettre à jour' : 'Créer'}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.submit && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-500 text-sm">{errors.submit}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reference */}
          <FormField label="Référence" required error={errors.reference}>
            <Input
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              placeholder="REF-2024-001"
              disabled={isLoading}
            />
          </FormField>

          {/* Poids */}
          <FormField label="Poids (kg)" required error={errors.poids}>
            <Input
              type="number"
              name="poids"
              value={formData.poids}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              disabled={isLoading}
            />
          </FormField>

          {/* Priorite */}
          <FormField label="Priorité" required error={errors.priorite}>
            <Select
              name="priorite"
              value={formData.priorite}
              onChange={handleChange}
              options={PRIORITE_OPTIONS}
              disabled={isLoading}
            />
          </FormField>

          {/* Expediteur */}
          <FormField label="Expéditeur" required error={errors.expediteurId}>
            <Select
              name="expediteurId"
              value={formData.expediteurId}
              onChange={handleChange}
              options={clients.map((client) => ({
                value: client.id,
                label: `${client.firstName} ${client.lastName}`,
              }))}
              placeholder="Sélectionner un expéditeur"
              disabled={isLoading}
            />
          </FormField>

          {/* Destinataire */}
          <FormField label="Destinataire" required error={errors.destinataireId}>
            <Select
              name="destinataireId"
              value={formData.destinataireId}
              onChange={handleChange}
              options={clients.map((client) => ({
                value: client.id,
                label: `${client.firstName} ${client.lastName}`,
              }))}
              placeholder="Sélectionner un destinataire"
              disabled={isLoading}
            />
          </FormField>

          {/* Zone */}
          <FormField label="Zone de livraison" required error={errors.zoneId}>
            <Select
              name="zoneId"
              value={formData.zoneId}
              onChange={handleChange}
              options={zones.map((zone) => ({
                value: zone.id,
                label: `${zone.name} (${zone.codePostal})`,
              }))}
              placeholder="Sélectionner une zone"
              disabled={isLoading}
            />
          </FormField>
        </div>

        {/* Adresse de livraison */}
        <div className="border-t border-foreground/10 pt-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Adresse de livraison
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Rue"
              required
              error={errors.rue}
              className="md:col-span-2"
            >
              <Input
                name="rue"
                value={formData.rue}
                onChange={handleChange}
                placeholder="123 Rue de la Paix"
                disabled={isLoading}
              />
            </FormField>

            <FormField label="Ville" required error={errors.ville}>
              <Input
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                placeholder="Paris"
                disabled={isLoading}
              />
            </FormField>

            <FormField label="Code Postal" required error={errors.codePostal}>
              <Input
                name="codePostal"
                value={formData.codePostal}
                onChange={handleChange}
                placeholder="75001"
                disabled={isLoading}
              />
            </FormField>
          </div>
        </div>

        {/* Description */}
        <FormField label="Description" error={errors.description}>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description du colis..."
            rows={4}
            disabled={isLoading}
          />
        </FormField>
      </form>
    </Modal>
  );
}
