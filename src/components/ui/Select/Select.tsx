import React from 'react';
import { cn } from '../../../utils/helpers';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string | number; label: string }>;
  placeholder?: string;
}

/**
 * Select - Reusable select dropdown component
 */
export const Select: React.FC<SelectProps> = ({
  options,
  placeholder = 'Sélectionner...',
  className,
  ...props
}) => {
  return (
    <select
      className={cn(
        'w-full px-4 py-2.5 rounded-lg',
        'bg-background border border-foreground/20',
        'text-foreground placeholder:text-foreground/40',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
        'transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
