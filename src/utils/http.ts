import { QueryClient } from '@tanstack/react-query';
import { Media } from '../types/types';

export const queryClient = new QueryClient();

const API_KEY = 'tWMXlOEOmnYg0gRg42Sdybx1aD9ylBnzJzmhvrPc';

interface FetchPicturesParams {
  signal: AbortSignal;
}

export async function fetchPictures({ signal }: FetchPicturesParams):Promise<Media> {

  let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the photos');

    throw error;
  }

  const result = await response.json();

  return result;
}