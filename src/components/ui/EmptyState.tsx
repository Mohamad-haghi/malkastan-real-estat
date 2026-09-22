import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
        {icon || <Inbox size={36} />}
      </div>
      <div>
        <h3 className="text-lg font-bold text-neutral-800">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-neutral-500 max-w-md">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
