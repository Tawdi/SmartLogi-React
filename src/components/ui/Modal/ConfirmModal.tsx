import React from 'react';
import Modal from './Modal';
import  Button  from '../Button/Button';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger' | 'warning';
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  isLoading = false,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const variantClasses = {
    default: 'text-primary',
    danger: 'text-red-500',
    warning: 'text-yellow-500',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      showFooter
      footerContent={
        <div className="flex justify-end space-x-3 w-full">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            className="min-w-[80px]"
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={handleConfirm}
            isLoading={isLoading}
            className="min-w-[80px]"
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <div className="py-2">
        <p className={`text-center ${variantClasses[variant]}`}>
          {message}
        </p>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
