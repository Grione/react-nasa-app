import { QueryClient } from '@tanstack/react-query';
import { MediaResponse, Media } from '../types/types';

export const queryClient = new QueryClient();

const API_KEY = 'tWMXlOEOmnYg0gRg42Sdybx1aD9ylBnzJzmhvrPc';

interface FetchPicturesParams {
  signal: AbortSignal;
  count?: number;
}

export async function fetchPictures({ signal, count }: FetchPicturesParams): Promise<MediaResponse> {

  let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

  if (count) {
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

export async function addFavorite(object: Media) {
  const response = await fetch('http://localhost:3001/api/data', {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the event');
    throw error;
  }

  return await response.json();
}

export async function fetchFavorite(): Promise<Media[]> {

  let url = `http://localhost:3001/api/data`;

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the photos');

    throw error;
  }

  const result = await response.json();

  return result;
}

export async function deleteFavorite({ url }: { url: string }) {
  const response = await fetch(`http://localhost:3001/api/data`, {
    method: 'DELETE',
    body: JSON.stringify({ url }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while deleting the event');

    throw error;
  }

  return response.json();
}
