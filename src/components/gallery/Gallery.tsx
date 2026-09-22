import { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';
import { toPersianDigits } from '@/utils/formatPrice';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface GalleryProps {
  images: string[];
  title: string;
}

const FALLBACK_IMAGE =
  'https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

function safeSrc(src: string, failed: boolean): string {
  return failed ? FALLBACK_IMAGE : src;
}

export function Gallery({ images, title }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const fullscreenRef = useRef<HTMLDivElement>(null);

  useFocusTrap(fullscreenRef, fullscreen);

  const markFailed = useCallback((index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  }, []);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!fullscreen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
      if (e.key === 'ArrowLeft') next();
      if (e.key === 'ArrowRight') prev();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [fullscreen, next, prev]);

  const currentFailed = failedImages.has(activeIndex);

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main image */}
        <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100">
          <img
            src={safeSrc(images[activeIndex], currentFailed)}
            alt={`${title} - تصویر ${toPersianDigits(activeIndex + 1)}`}
            className="h-full w-full object-cover"
            onError={() => markFailed(activeIndex)}
          />

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-800 backdrop-blur-md transition-all hover:bg-white hover:shadow-lg opacity-0 group-hover:opacity-100"
                aria-label="تصویر بعدی"
              >
                <ChevronRight size={22} />
              </button>
              <button
                onClick={next}
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-800 backdrop-blur-md transition-all hover:bg-white hover:shadow-lg opacity-0 group-hover:opacity-100"
                aria-label="تصویر قبلی"
              >
                <ChevronLeft size={22} />
              </button>
            </>
          )}

          {/* Fullscreen button */}
          <button
            onClick={() => setFullscreen(true)}
            className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-neutral-800 backdrop-blur-md transition-all hover:bg-white hover:shadow-lg opacity-0 group-hover:opacity-100"
            aria-label="نمایش تمام صفحه"
          >
            <Expand size={18} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 right-4 rounded-full bg-neutral-950/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {toPersianDigits(activeIndex + 1)} / {toPersianDigits(images.length)}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-xl transition-all ${
                  activeIndex === i
                    ? 'ring-2 ring-primary-600 ring-offset-2'
                    : 'opacity-60 hover:opacity-100'
                }`}
                aria-label={`تصویر ${toPersianDigits(i + 1)}`}
              >
                <img
                  src={safeSrc(img, failedImages.has(i))}
                  alt={`${title} - تصویر کوچک ${toPersianDigits(i + 1)}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={() => markFailed(i)}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen viewer */}
      {fullscreen && (
        <div
          ref={fullscreenRef}
          tabIndex={-1}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-neutral-950/95 backdrop-blur-md"
          onClick={() => setFullscreen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-6 left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="بستن"
          >
            <X size={24} />
          </button>

          <img
            src={safeSrc(images[activeIndex], currentFailed)}
            alt={`${title} - تصویر ${toPersianDigits(activeIndex + 1)}`}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
            onError={() => markFailed(activeIndex)}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute right-6 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="بعدی"
              >
                <ChevronRight size={28} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute left-6 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="قبلی"
              >
                <ChevronLeft size={28} />
              </button>
            </>
          )}

          <div className="absolute bottom-8 right-1/2 translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
            {toPersianDigits(activeIndex + 1)} / {toPersianDigits(images.length)}
          </div>
        </div>
      )}
    </>
  );
}
