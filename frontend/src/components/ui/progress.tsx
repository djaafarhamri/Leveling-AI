import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const { theme } = useTheme();

  // Add theme-specific classes
  let progressBarClass = 'progress-bar';
  let progressValueClass = 'progress-value';

  if (theme === 'elden-ring') {
    progressBarClass = 'elden-ring-progress-bar';
    progressValueClass = 'elden-ring-progress-value';
  } else if (theme === 'league') {
    progressBarClass = 'league-progress-bar';
    progressValueClass = 'league-progress-value';
  } else if (theme === 'wow') {
    progressBarClass = 'wow-progress-bar';
    progressValueClass = 'wow-progress-value';
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
        progressBarClass,
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn('h-full w-full flex-1 bg-primary transition-all', progressValueClass)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
