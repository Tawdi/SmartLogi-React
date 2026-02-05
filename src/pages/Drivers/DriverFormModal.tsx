import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal/Modal';
import { FormField } from '../../components/shared/FormField/FormField';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import type { DriverRequest, DriverResponse } from '../../types/api.types';

interface DriverFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DriverRequest) => Promise<void>;
  driver?: DriverResponse | null;
  isLoading?: boolean;
}

export default function DriverFormModal({
  isOpen,
  onClose,
  onSubmit,
  driver,
  isLoading = false,
}: DriverFormModalProps) {
  const [formData, setFormData] = useState<DriverRequest>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    vehicleType: '',
    licenseNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (driver && isOpen) {
      setFormData({
        firstName: driver.firstName || '',
        lastName: driver.lastName || '',
        email: driver.email || '',
        phoneNumber: driver.phoneNumber || '',
        vehicleType: driver.vehicleType || '',
        licenseNumber: driver.licenseNumber || '',
      });
    } else if (!isOpen) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        vehicleType: '',
        licenseNumber: '',
      });
      setErrors({});
    }
  }, [driver, isOpen]);

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
    if (!formData.vehicleType?.trim()) {
      newErrors.vehicleType = 'Le type de véhicule est obligatoire';
    }
    if (!formData.licenseNumber?.trim()) {
      newErrors.licenseNumber = 'Le numéro de permis est obligatoire';
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
      title={driver ? 'Modifier le chauffeur' : 'Nouveau chauffeur'}
      size="lg"
      showFooter
      footerContent={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} isLoading={isLoading}>
            {driver ? 'Mettre à jour' : 'Créer'}
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

          <FormField label="Type de véhicule" required error={errors.vehicleType}>
            <Input
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              placeholder="Camionnette, Voiture, Moto..."
              disabled={isLoading}
            />
          </FormField>

          <FormField label="Numéro de permis" required error={errors.licenseNumber}>
            <Input
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="ABC123456"
              disabled={isLoading}
            />
          </FormField>
        </div>
      </form>
    </Modal>
  );
}
