import { useCallback, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

export const useFetchPhotos = () => {
  const [dataImages, setDataImages] = useState<{
    images: string[]
    totalPages: number
  }>({
    images: [],
    totalPages: 0,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const searchPhotos = useCallback(
    async (query: string, page: number) => {
      if (loading) return
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(API_URL, {
          params: {
            client_id: CLIENT_ID,
            query: query,
            page: page,
            per_page: 30
          },
        })

        setDataImages((prevState) => ({
          images:
            page === 1
              ? response.data.results.map(
                  (photo: { urls: { regular: string } }) => photo.urls.regular,
                )
              : [
                  ...prevState.images,
                  ...response.data.results.map(
                    (photo: { urls: { regular: string } }) =>
                      photo.urls.regular,
                  ),
                ],
          totalPages: response.data.total_pages,
        }))
      } catch (err) {
        setError('Произошла ошибка при загрузке данных')
      } finally {
        setLoading(false)
      }
    },
    [loading],
  )

  return { loading, setLoading, error, searchPhotos, dataImages }
}
