import { useEffect } from 'react';
import type { ReactNode } from 'react';

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  type?: string;
}

export function Seo({ title, description, image, type = 'website' }: SeoProps) {
  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
  }, [title, description, image, type]);

  return null as ReactNode;
}

function setMeta(attr: 'name' | 'property', key: string, content?: string) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
