import { useReveal } from '@/hooks/useReveal';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: 'up' | 'scale' | 'stagger';
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

export function Reveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  as: Tag = 'div',
}: RevealProps) {
  const { ref, visible } = useReveal();

  const baseClass =
    variant === 'scale'
      ? 'reveal-scale'
      : variant === 'stagger'
        ? 'reveal-stagger'
        : 'reveal';

  return (
    <Tag
      ref={ref as never}
      className={`${baseClass} ${visible ? 'reveal-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
