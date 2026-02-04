import React from 'react';
import { cn } from '../../../utils/helpers';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full' | 'fluid';
  centered?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'md', centered = true, ...props }, ref) => {
    const sizes = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      full: 'max-w-full',
      fluid: 'max-w-full px-4 sm:px-6 lg:px-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full',
          size !== 'full' && 'mx-auto px-4 sm:px-6 lg:px-8',
          sizes[size],
          centered && 'mx-auto',
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';
export default Container;
