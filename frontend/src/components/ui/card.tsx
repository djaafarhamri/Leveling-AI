import * as React from 'react';

import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme();

    // Add theme-specific classes
    let themeClass = 'card';

    if (theme === 'elden-ring') {
      themeClass = 'elden-ring-card';
    } else if (theme === 'league') {
      themeClass = 'league-card';
    } else if (theme === 'wow') {
      themeClass = 'wow-card';
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border bg-card text-card-foreground shadow-sm',
          themeClass,
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme();

    // Add theme-specific classes
    let themeClass = 'font-display';

    if (theme === 'elden-ring') {
      themeClass = 'font-display elden-ring-text-glow';
    } else if (theme === 'league') {
      themeClass = 'font-display league-text-glow';
    } else if (theme === 'wow') {
      themeClass = 'font-display wow-text-glow';
    }

    return (
      <h3
        ref={ref}
        className={cn('text-2xl font-semibold leading-none tracking-tight', themeClass, className)}
        {...props}
      />
    );
  }
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
