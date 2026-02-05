import React from 'react';
import { cn } from '../../../utils/helpers';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  hint?: string;
}

/**
 * FormField - Wrapper for form inputs with label and error display
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required = false,
  className,
  children,
  hint,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-foreground/60">{hint}</p>
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
