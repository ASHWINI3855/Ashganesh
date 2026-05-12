import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useOptimizedImage } from '../hooks/useOptimizedImage';
import { useOptimizedVideo } from '../hooks/useOptimizedVideo';

/**
 * useSupabaseMedia — fetches the public_url for a given section from Supabase.
 * Results are cached in a module-level Map so repeated mounts don't re-fetch.
 */
const _urlCache = new Map();

export function useSupabaseMedia(section) {
  const [url, setUrl] = useState(() => _urlCache.get(section) ?? null);

  useEffect(() => {
    if (!section) return;
    // Already cached — skip network request
    if (_urlCache.has(section)) {
      setUrl(_urlCache.get(section));
      return;
    }

    async function fetchMedia() {
      const { data } = await supabase
        .from('media_assets')
        .select('public_url')
        .eq('section', section)
        .single();

      if (data?.public_url) {
        _urlCache.set(section, data.public_url);
        setUrl(data.public_url);
      }
    }

    fetchMedia();
  }, [section]);

  return url;
}

/**
 * SupabaseImage — Optimised image component for Supabase-hosted images
 *
 * Features:
 *  ✅ AVIF → WebP → original fallback via Supabase Image Transform API
 *  ✅ Responsive multi-width srcset (320 → 2000px)
 *  ✅ LQIP blur-up (20px-wide placeholder → smooth full-res reveal)
 *  ✅ Shimmer skeleton while LQIP loads
 *  ✅ CLS prevention via aspect-ratio wrapper
 *  ✅ Smooth fade-in + scale reveal
 *  ✅ Module-level URL cache (no duplicate Supabase queries on re-mount)
 *  ✅ Automatic fallback to fallbackSrc on error
 *  ✅ priority prop for above-fold eager loading
 */
export function SupabaseImage({
  section,
  fallbackSrc,
  alt              = '',
  className        = '',
  wrapperClassName = '',
  priority         = false,
  aspectRatio      = 'auto',
  objectFit        = 'cover',
  objectPosition   = 'center',
  quality          = 80,
  width            = 800,
  showSkeleton     = true,
  style            = {},
  onImageLoad      = null,
  sizes = '(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  ...props
}) {
  const rawUrl = useSupabaseMedia(section);
  const [usedFallback, setUsedFallback] = useState(false);
  const [lqipLoaded, setLqipLoaded]     = useState(false);

  const { wrapperRef, imgRef, isVisible, isLoaded, onLoad, onError } =
    useOptimizedImage({ priority });

  // ── Supabase Image Transform URL builder ──────────────────────────────────
  const buildTransformUrl = (originalUrl, { fmt = 'webp', w = width, q = quality } = {}) => {
    if (!originalUrl) return null;
    if (!originalUrl.includes('/object/public/')) return originalUrl;

    const renderUrl = originalUrl.replace(
      '/object/public/',
      '/object/render/image/public/'
    );
    return `${renderUrl}?format=${fmt}&quality=${q}&width=${w}`;
  };

  // ── Generate multi-width srcset ───────────────────────────────────────────
  const buildSrcSet = (originalUrl, fmt = 'webp') => {
    if (!originalUrl || !originalUrl.includes('/object/public/')) return undefined;
    const widths = [320, 480, 640, 800, 1080, 1200, 1600];
    return widths
      .map(w => `${buildTransformUrl(originalUrl, { fmt, w })} ${w}w`)
      .join(', ');
  };

  const optimizedUrl  = rawUrl ? buildTransformUrl(rawUrl, { fmt: 'webp' }) : null;
  const avifSrcSet    = rawUrl ? buildSrcSet(rawUrl, 'avif') : undefined;
  const webpSrcSet    = rawUrl ? buildSrcSet(rawUrl, 'webp') : undefined;
  const lqipUrl       = rawUrl ? buildTransformUrl(rawUrl, { fmt: 'webp', w: 20, q: 30 }) : null;

  const finalSrc = usedFallback || !optimizedUrl ? fallbackSrc : optimizedUrl;

  const handleError = () => {
    if (!usedFallback && fallbackSrc) {
      setUsedFallback(true);
    } else {
      onError();
    }
  };

  const handleLoad = () => {
    onLoad();
    onImageLoad?.();
  };

  const wrapperStyle = {
    position:        'relative',
    overflow:        'hidden',
    display:         'block',
    backgroundColor: 'rgba(255,255,255,0.04)',
    ...(aspectRatio !== 'auto' && { aspectRatio }),
    ...style,
  };

  const imgStyle = {
    position:      aspectRatio !== 'auto' ? 'absolute' : 'relative',
    inset:         aspectRatio !== 'auto' ? 0 : undefined,
    width:         '100%',
    height:        aspectRatio !== 'auto' ? '100%' : undefined,
    objectFit,
    objectPosition,
    zIndex:        1,
    opacity:       isLoaded ? 1 : 0,
    transform:     isLoaded ? 'scale(1)' : 'scale(1.05)',
    transition:    'opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.75s cubic-bezier(0.4,0,0.2,1)',
  };

  return (
    <div
      ref={wrapperRef}
      className={`opt-img-wrapper ${wrapperClassName}`}
      style={wrapperStyle}
    >
      {/* ── Shimmer (shown until LQIP or main image loads) ──────────────── */}
      {showSkeleton && !isLoaded && !lqipLoaded && (
        <div className="opt-img-skeleton" aria-hidden="true" />
      )}

      {/* ── LQIP blur-up placeholder ────────────────────────────────────── */}
      {lqipUrl && !isLoaded && (
        <img
          src={lqipUrl}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          onLoad={() => setLqipLoaded(true)}
          className={`opt-img-lqip${isLoaded ? ' opt-img-lqip--hidden' : ''}`}
        />
      )}

      {/* ── Main image: AVIF → WebP → fallback ──────────────────────────── */}
      {isVisible && finalSrc && (
        <picture style={{ display: 'contents' }}>
          {/* AVIF: best compression, Chrome 85+, Safari 16+ */}
          {avifSrcSet && !usedFallback && (
            <source srcSet={avifSrcSet} type="image/avif" sizes={sizes} />
          )}
          {/* WebP: broad support */}
          {webpSrcSet && !usedFallback && (
            <source srcSet={webpSrcSet} type="image/webp" sizes={sizes} />
          )}
          <img
            ref={imgRef}
            src={finalSrc}
            alt={alt}
            loading="eager"
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={handleLoad}
            onError={handleError}
            className={`opt-img-main ${className}`}
            style={imgStyle}
            sizes={sizes}
            {...props}
          />
        </picture>
      )}
    </div>
  );
}

/**
 * SupabaseVideo — Optimised video component for Supabase-hosted videos
 * 
 * Features:
 *  ✅ IntersectionObserver lazy load & visibility-based pause
 *  ✅ Network-aware preload strategy ('none' vs 'metadata')
 *  ✅ Poster image support (lightweight thumbnail before load)
 *  ✅ Reduced-motion support (stops autoplay)
 */
export function SupabaseVideo({
  section,
  fallbackSrc,
  posterSrc,
  className   = '',
  priority    = false,
  aspectRatio = 'auto',
  ...props
}) {
  const url = useSupabaseMedia(section);
  const [usedFallback, setUsedFallback] = useState(false);

  const finalUrl = usedFallback || !url ? fallbackSrc : url;

  const {
    wrapperRef,
    videoRef,
    isVisible,
    isReady,
    isPlaying,
    hasError,
    preload,
    prefersReducedMotion,
    onSrcSet,
    onCanPlay,
    onError,
  } = useOptimizedVideo({ priority });

  // When finalUrl is ready and wrapper is visible, we set the source.
  useEffect(() => {
    if (isVisible && finalUrl && videoRef.current && !videoRef.current.src) {
      videoRef.current.src = finalUrl;
      onSrcSet();
    }
  }, [isVisible, finalUrl, videoRef, onSrcSet]);

  const handleError = () => {
    if (!usedFallback && fallbackSrc) {
      setUsedFallback(true);
      if (videoRef.current) {
        videoRef.current.src = fallbackSrc; // Load fallback
      }
    } else {
      onError();
    }
  };

  const wrapperStyle = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.04)',
    ...(aspectRatio !== 'auto' && { aspectRatio }),
  };

  return (
    <div ref={wrapperRef} className="opt-video-wrapper" style={wrapperStyle}>
      {/* ── Shimmer / Poster ────────────────────────────────────────────── */}
      {!isReady && (
        <>
          {posterSrc ? (
            <img 
              src={posterSrc} 
              alt="Video preview" 
              className="opt-video-poster"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(10px)',
                transform: 'scale(1.05)',
                transition: 'opacity 0.6s ease',
                zIndex: 1,
              }}
            />
          ) : (
            <div className="opt-img-skeleton" aria-hidden="true" />
          )}
        </>
      )}

      {/* ── Video Element ─────────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        poster={posterSrc}
        onCanPlay={onCanPlay}
        onError={handleError}
        className={`opt-video-main ${className}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.75s ease-out',
          zIndex: 2,
          position: 'relative',
        }}
        autoPlay={!prefersReducedMotion}
        loop
        muted
        playsInline
        preload={preload}
        {...props}
      />
    </div>
  );
}

export default SupabaseImage;
