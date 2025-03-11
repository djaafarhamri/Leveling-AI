'use client';

import { useToast } from '../../hooks/use-toast';
import { X } from 'lucide-react';
import { Button } from './button';

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-card border rounded-lg shadow-lg p-4 flex items-start gap-3 animate-in slide-in-from-bottom-5"
        >
          <div className="flex-1">
            <h3 className="font-medium">{toast.title}</h3>
            {toast.description && (
              <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>
            )}
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => dismiss(toast.id)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      ))}
    </div>
  );
}
