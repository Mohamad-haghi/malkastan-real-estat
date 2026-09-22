import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  side?: 'right' | 'left';
}

export function Drawer({ open, onClose, children, title, side = 'right' }: DrawerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useFocusTrap(containerRef, open);

  if (!open) return null;

  const sideClass =
    side === 'right'
      ? 'right-0 animate-slide-in-right'
      : 'left-0 animate-slide-in-left';

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        ref={containerRef}
        tabIndex={-1}
        className={`absolute top-0 ${sideClass} h-full w-full max-w-sm overflow-y-auto bg-white shadow-2xl`}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
            <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
              aria-label="بستن"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
