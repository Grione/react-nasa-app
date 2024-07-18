import { QueryClient } from '@tanstack/react-query';
import { MediaResponse, Media } from '../types/types';

export const queryClient = new QueryClient();

const API_KEY = 'tWMXlOEOmnYg0gRg42Sdybx1aD9ylBnzJzmhvrPc';

interface FetchPicturesParams {
  signal: AbortSignal;
  count?: number;
}

export async function fetchPictures({ signal, count }: FetchPicturesParams):Promise<MediaResponse> {

  let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

  if(count) {
    url += `&count=${count}`
  }

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the photos');

    throw error;
  }

  const result = await response.json();

  return result;
}


export const fetchSinglePicture = async ({ signal }: FetchPicturesParams): Promise<Media> => {
  const result = await fetchPictures({ signal });
  if (Array.isArray(result)) {
    throw new Error('Expected a single picture, but got an array');
  }
  return result;
};

export const fetchPicturesArray = async ({ signal, count }: FetchPicturesParams): Promise<Media[]> => {
  const result = await fetchPictures({ signal, count });
  if (!Array.isArray(result)) {
    throw new Error('Expected an array of pictures, but got a single picture');
  }
  return result;
};