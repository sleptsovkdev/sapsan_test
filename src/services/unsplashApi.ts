import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;


export const fetchPhotos = async (query: string) => {
  const response = await axios.get(API_URL, {
    params: {
      client_id: CLIENT_ID,
      query: query,
    },
  });

  return response.data.results.map((photo: { urls: { regular: string } }) => photo.urls.regular);
};