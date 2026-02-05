import React from 'react';
import { cn } from '../../../utils/helpers';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Textarea - Reusable textarea component
 */
export const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={cn(
        'w-full px-4 py-2.5 rounded-lg',
        'bg-background border border-foreground/20',
        'text-foreground placeholder:text-foreground/40',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
        'transition-colors resize-y',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'min-h-[100px]',
        className
      )}
      {...props}
    />
  );
};
