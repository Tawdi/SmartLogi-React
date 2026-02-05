import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal/Modal';
import { FormField } from '../../components/shared/FormField/FormField';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import type { ClientRequest, ClientResponse } from '../../types/api.types';

interface ClientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClientRequest) => Promise<void>;
  client?: ClientResponse | null;
  isLoading?: boolean;
}

export default function ClientFormModal({
  isOpen,
  onClose,
  onSubmit,
  client,
  isLoading = false,
}: ClientFormModalProps) {
  const [formData, setFormData] = useState<ClientRequest>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    rue: '',
    ville: '',
    codePostal: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (client && isOpen) {
      setFormData({
        firstName: client.firstName || '',
        lastName: client.lastName || '',
        email: client.email || '',
        phoneNumber: client.phoneNumber || '',
        rue: client.rue || '',
        ville: client.ville || '',
        codePostal: client.codePostal || '',
      });
    } else if (!isOpen) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        rue: '',
        ville: '',
        codePostal: '',
      });
      setErrors({});
    }
  }, [client, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'Le prénom est obligatoire';
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Le nom est obligatoire';
    }
    if (!formData.email?.trim()) {
      newErrors.email = "L'email est obligatoire";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Le téléphone est obligatoire';
    }
    if (!formData.rue?.trim()) {
      newErrors.rue = 'La rue est obligatoire';
    }
    if (!formData.ville?.trim()) {
      newErrors.ville = 'La ville est obligatoire';
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
      title={client ? 'Modifier le client' : 'Nouveau client'}
      size="lg"
      showFooter
      footerContent={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} isLoading={isLoading}>
            {client ? 'Mettre à jour' : 'Créer'}
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
          <FormField label="Prénom" required error={errors.firstName}>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Jean"
              disabled={isLoading}
            />
          </FormField>

          <FormField label="Nom" required error={errors.lastName}>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Dupont"
              disabled={isLoading}
            />
          </FormField>

          <FormField label="Email" required error={errors.email}>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jean.dupont@example.com"
              disabled={isLoading}
            />
          </FormField>

          <FormField label="Téléphone" required error={errors.phoneNumber}>
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="0123456789"
              disabled={isLoading}
            />
          </FormField>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Adresse</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Rue" required error={errors.rue} className="md:col-span-2">
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
      </form>
    </Modal>
  );
}
