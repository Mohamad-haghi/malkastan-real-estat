import { Loader2 } from 'lucide-react';

export function Spinner({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <Loader2
      size={size}
      className={`animate-spin text-primary-600 ${className}`}
      aria-label="در حال بارگذاری"
    />
  );
}

export function LoadingOverlay({ label = 'در حال بارگذاری...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <Spinner size={40} />
      <p className="text-sm text-neutral-500">{label}</p>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="h-56 animate-pulse bg-neutral-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-200" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 w-20 animate-pulse rounded-lg bg-neutral-200" />
          <div className="h-8 w-20 animate-pulse rounded-lg bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
