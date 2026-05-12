import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useOptimizedVideo
 *
 * High-performance video loading hook.
 *
 * Features:
 *  ✅ IntersectionObserver — only loads/plays when in viewport
 *  ✅ Visibility-based pause — stops playing when scrolled away (saves battery)
 *  ✅ Network-aware preload — uses 'none' on 2G/saveData, 'metadata' otherwise
 *  ✅ priority=true  — starts loading immediately (above-fold videos)
 *  ✅ Smooth readiness states: isVisible → isSrcSet → isReady → isPlaying
 *  ✅ Respects prefers-reduced-motion (pauses autoplay)
 *  ✅ Tracks error state for graceful fallback
 *
 * @param {Object} options
 * @param {boolean} options.priority       - Skip IO, load eagerly
 * @param {string}  options.rootMargin     - IO margin before triggering
 * @param {boolean} options.pauseOnLeave   - Pause when scrolled out of view
 * @param {boolean} options.autoplay       - Whether to autoplay on ready
 */
export function useOptimizedVideo({
  priority     = false,
  rootMargin   = '200px 0px',
  pauseOnLeave = true,
  autoplay     = true,
} = {}) {
  const wrapperRef              = useRef(null);
  const videoRef                = useRef(null);
  const [isVisible,  setIsVisible]  = useState(priority);
  const [isSrcSet,   setIsSrcSet]   = useState(false);  // src applied to <video>
  const [isReady,    setIsReady]    = useState(false);   // canplay fired
  const [isPlaying,  setIsPlaying]  = useState(false);
  const [hasError,   setHasError]   = useState(false);

  // ── Reduced-motion check ─────────────────────────────────────────────────
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Network-aware preload strategy ───────────────────────────────────────
  const preload = (() => {
    if (priority) return 'auto';            // Above-fold: buffer aggressively
    try {
      const conn = navigator?.connection;
      if (conn?.saveData || conn?.effectiveType === '2g') return 'none';
      if (conn?.effectiveType === '3g') return 'metadata';
    } catch (_) { /* ignore */ }
    return 'metadata';                      // Default: download metadata only
  })();

  // ── IntersectionObserver — trigger src injection ─────────────────────────
  useEffect(() => {
    if (priority) { setIsVisible(true); return; }
    if (!wrapperRef.current) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );

    io.observe(wrapperRef.current);
    return () => io.disconnect();
  }, [priority, rootMargin]);

  // ── IntersectionObserver — play/pause based on visibility ───────────────
  useEffect(() => {
    if (!pauseOnLeave || !isSrcSet || prefersReducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const playPauseIO = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.25 }   // at least 25% visible before playing
    );

    playPauseIO.observe(video);
    return () => playPauseIO.disconnect();
  }, [isSrcSet, pauseOnLeave, prefersReducedMotion]);

  // ── Callbacks ─────────────────────────────────────────────────────────────
  const onSrcSet  = useCallback(() => setIsSrcSet(true), []);

  const onCanPlay = useCallback(() => {
    setIsReady(true);
    if (autoplay && !prefersReducedMotion) {
      videoRef.current?.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [autoplay, prefersReducedMotion]);

  const onError   = useCallback(() => setHasError(true), []);
  const onPlaying = useCallback(() => setIsPlaying(true), []);
  const onPause   = useCallback(() => setIsPlaying(false), []);

  return {
    wrapperRef,
    videoRef,
    isVisible,
    isSrcSet,
    isReady,
    isPlaying,
    hasError,
    preload,
    prefersReducedMotion,
    onSrcSet,
    onCanPlay,
    onError,
    onPlaying,
    onPause,
  };
}
