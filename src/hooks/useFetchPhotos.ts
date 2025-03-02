import { useState } from 'react';
import { fetchPhotos } from '../services/unsplashApi';

export const useFetchPhotos = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchPhotos = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPhotos(query);
      setImages(data);
    } catch (err) {
      setError(`Failed to fetch photo: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return { images, loading, error, searchPhotos };
};