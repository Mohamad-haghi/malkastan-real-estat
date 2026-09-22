import { useRef, useState } from 'react';
import { Play, X, Volume2, VolumeX } from 'lucide-react';

interface VideoTourProps {
  src: string;
  poster?: string;
  title: string;
}

export function VideoTour({ src, poster, title }: VideoTourProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-neutral-900">
      {!failed ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      ) : poster ? (
        <img
          src={poster}
          alt={title}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-neutral-500">
          <div className="text-center">
            <Play size={32} className="mx-auto" />
            <p className="mt-2 text-sm">ویدئو در دسترس نیست</p>
          </div>
        </div>
      )}

      {/* Overlay controls */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/40 via-transparent to-transparent">
        {!playing && (
          <button
            onClick={togglePlay}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-neutral-900 backdrop-blur-md transition-all hover:scale-110 hover:bg-white"
            aria-label="پخش ویدئو"
          >
            <Play size={28} fill="currentColor" />
          </button>
        )}
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        {playing && (
          <button
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/30"
            aria-label="توقف"
          >
            <X size={18} />
          </button>
        )}
        <button
          onClick={toggleMute}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/30"
          aria-label={muted ? 'فعال‌سازی صدا' : 'قطع صدا'}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Label */}
      <div className="absolute top-4 right-4 rounded-full bg-neutral-950/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
        تور ویدئویی • {title}
      </div>
    </div>
  );
}
