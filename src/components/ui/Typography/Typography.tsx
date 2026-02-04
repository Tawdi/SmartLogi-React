import React from 'react';
import { cn } from '../../../utils/helpers';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
  color?: 'default' | 'primary' | 'secondary' | 'muted' | 'danger';
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({
    children,
    className,
    as: Component = 'p',
    variant = 'body1',
    color = 'default',
    align = 'left',
    weight = 'normal',
    ...props
  }, ref) => {
    const variants = {
      h1: 'text-4xl md:text-5xl font-bold',
      h2: 'text-3xl md:text-4xl font-bold',
      h3: 'text-2xl md:text-3xl font-semibold',
      h4: 'text-xl md:text-2xl font-semibold',
      h5: 'text-lg md:text-xl font-medium',
      h6: 'text-base md:text-lg font-medium',
      body1: 'text-base',
      body2: 'text-sm',
      caption: 'text-xs',
    };

    const colors = {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-foreground/80',
      muted: 'text-foreground/60',
      danger: 'text-red-500',
    };

    const aligns = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    };

    const weights = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          variants[variant],
          colors[color],
          aligns[align],
          weights[weight],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

// Convenience components
export const H1 = (props: Omit<TypographyProps, 'variant' | 'as'>) => (
  <Typography as="h1" variant="h1" {...props} />
);

export const H2 = (props: Omit<TypographyProps, 'variant' | 'as'>) => (
  <Typography as="h2" variant="h2" {...props} />
);

export const H3 = (props: Omit<TypographyProps, 'variant' | 'as'>) => (
  <Typography as="h3" variant="h3" {...props} />
);

export const P = (props: Omit<TypographyProps, 'variant' | 'as'>) => (
  <Typography as="p" variant="body1" {...props} />
);

export const Caption = (props: Omit<TypographyProps, 'variant' | 'as'>) => (
  <Typography as="span" variant="caption" {...props} />
);

export default Typography;
