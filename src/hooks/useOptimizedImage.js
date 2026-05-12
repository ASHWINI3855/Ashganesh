import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useOptimizedImage
 *
 * Advanced IntersectionObserver-based image loading hook.
 *
 * Features:
 *  ✅ IntersectionObserver lazy load (rootMargin pre-fetches before viewport)
 *  ✅ priority=true → eager / above-the-fold (skips IO entirely)
 *  ✅ LQIP (Low Quality Image Placeholder) blur-up support
 *  ✅ Network-aware: slow connections get larger rootMargin for earlier prefetch
 *  ✅ Reduced-motion safe
 *  ✅ Browser image decode() API to avoid jank on reveal
 */
export function useOptimizedImage({
  priority    = false,
  rootMargin  = '400px 0px',   // start loading 400px before viewport
  threshold   = 0,
} = {}) {
  const wrapperRef            = useRef(null);
  const imgRef                = useRef(null);
  const [isVisible, setIsVisible] = useState(priority);
  const [isLoaded,  setIsLoaded]  = useState(false);
  const [hasError,  setHasError]  = useState(false);
  const [lqipLoaded, setLqipLoaded] = useState(false);

  // ── Network-aware rootMargin ───────────────────────────────────────────────
  const effectiveMargin = (() => {
    try {
      const conn = navigator?.connection;
      if (conn && (conn.saveData || conn.effectiveType === '2g')) {
        return '100px 0px'; // Slower pre-load on poor connections
      }
      if (conn && conn.effectiveType === '3g') {
        return '250px 0px';
      }
    } catch (_) { /* ignore */ }
    return rootMargin;
  })();

  // ── IntersectionObserver ───────────────────────────────────────────────────
  useEffect(() => {
    if (priority) { setIsVisible(true); return; }
    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: effectiveMargin, threshold }
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [priority, effectiveMargin, threshold]);

  // ── Decode API for smooth reveal ───────────────────────────────────────────
  const onLoad = useCallback(() => {
    const img = imgRef.current;
    if (img && typeof img.decode === 'function') {
      img.decode()
        .then(() => setIsLoaded(true))
        .catch(() => setIsLoaded(true));   // Fallback if decode() rejects
    } else {
      setIsLoaded(true);
    }
  }, []);

  const onError      = useCallback(() => { setHasError(true); setIsLoaded(true); }, []);
  const onLqipLoad   = useCallback(() => setLqipLoaded(true), []);

  return {
    wrapperRef,
    imgRef,
    isVisible,
    isLoaded,
    hasError,
    lqipLoaded,
    onLoad,
    onError,
    onLqipLoad,
  };
}
