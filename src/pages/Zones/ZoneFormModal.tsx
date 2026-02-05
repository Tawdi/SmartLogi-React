import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal/Modal';
import { FormField } from '../../components/shared/FormField/FormField';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import type { ZoneRequest, ZoneResponse } from '../../types/api.types';

interface ZoneFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ZoneRequest) => Promise<void>;
  zone?: ZoneResponse | null;
  isLoading?: boolean;
}

export default function ZoneFormModal({
  isOpen,
  onClose,
  onSubmit,
  zone,
  isLoading = false,
}: ZoneFormModalProps) {
  const [formData, setFormData] = useState<ZoneRequest>({
    name: '',
    codePostal: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (zone && isOpen) {
      setFormData({
        name: zone.name || '',
        codePostal: zone.codePostal || '',
      });
    } else if (!isOpen) {
      setFormData({
        name: '',
        codePostal: '',
      });
      setErrors({});
    }
  }, [zone, isOpen]);

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

    if (!formData.name?.trim()) {
      newErrors.name = 'Le nom est obligatoire';
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
      title={zone ? 'Modifier la zone' : 'Nouvelle zone'}
      size="md"
      showFooter
      footerContent={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} isLoading={isLoading}>
            {zone ? 'Mettre à jour' : 'Créer'}
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

        <FormField label="Nom" required error={errors.name}>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Zone Nord"
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
      </form>
    </Modal>
  );
}
