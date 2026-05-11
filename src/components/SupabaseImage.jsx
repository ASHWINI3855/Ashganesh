import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Hook to fetch media from the new media_assets table
export function useSupabaseMedia(section) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!section) return;
    async function fetchMedia() {
      const { data, error } = await supabase
        .from('media_assets')
        .select('public_url')
        .eq('section', section)
        .single();
        
      if (data && data.public_url) {
        setUrl(data.public_url);
      }
    }
    fetchMedia();
  }, [section]);

  return url;
}

export function SupabaseImage({ section, fallbackSrc, alt, className, onError, ...props }) {
  const url = useSupabaseMedia(section);
  const [error, setError] = useState(false);

  const handleError = (e) => {
    setError(true);
    if (onError) onError(e);
  };

  return (
    <img
      src={error || !url ? fallbackSrc : url}
      alt={alt || 'Image'}
      className={className}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
}

export function SupabaseVideo({ section, fallbackSrc, className, ...props }) {
  const url = useSupabaseMedia(section);
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <video
      src={error || !url ? fallbackSrc : url}
      className={className}
      onError={handleError}
      autoPlay
      loop
      muted
      playsInline
      {...props}
    />
  );
}

export default SupabaseImage;
