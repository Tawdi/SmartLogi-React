import React, { useEffect } from 'react';
import { cn } from '../../../utils/helpers';
import  Button  from '../Button/Button';

// If you don't want to install lucide-react, use this SVG instead:
const XIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  showHeader = true,
  showFooter = false,
  footerContent,
  className,
  overlayClassName,
  contentClassName,
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          'bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
          overlayClassName
        )}
        onClick={handleOverlayClick}
        aria-hidden="true"
      >
        {/* Modal Container */}
        <div
          className={cn(
            'relative mx-4 my-8 w-full',
            sizeClasses[size],
            'animate-in fade-in-0 zoom-in-95 duration-300',
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
        >
          {/* Modal Content */}
          <div
            className={cn(
              'bg-background rounded-xl shadow-2xl',
              'border border-foreground/10',
              'transform transition-all duration-300',
              contentClassName
            )}
          >
            {/* Header */}
            {showHeader && (title || description || showCloseButton) && (
              <div className="flex items-start justify-between p-6 border-b border-foreground/10">
                <div className="flex-1">
                  {title && (
                    <h3
                      id="modal-title"
                      className="text-xl font-semibold text-foreground"
                    >
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p
                      id="modal-description"
                      className="mt-1 text-sm text-foreground/70"
                    >
                      {description}
                    </p>
                  )}
                </div>

                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="ml-4 rounded-lg p-1.5 text-foreground/50 hover:text-foreground hover:bg-foreground/10 transition-colors"
                    aria-label="Close modal"
                  >
                    <XIcon />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className={cn(
              'p-6',
              !showHeader && 'pt-6',
              !showFooter && 'pb-6'
            )}>
              {children}
            </div>

            {/* Footer */}
            {showFooter && (
              <div className="px-6 py-4 border-t border-foreground/10 bg-foreground/5 rounded-b-xl">
                {footerContent || (
                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="ghost"
                      onClick={onClose}
                      className="min-w-[80px]"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={onClose}
                      className="min-w-[80px]"
                    >
                      Confirm
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
