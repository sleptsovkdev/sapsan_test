import { useCallback, useEffect, useRef, useState } from 'react'
import { useFetchPhotos } from '../../hooks/useFetchPhotos'
import { SearchInput } from '../../components/common/SearchInput'
import { Button } from '../../components/common/Button'
import { ImageGallery } from '../../components/ImageGallery'
import { Loader } from '../../components/common/Loader'
import { useScrollToTop } from '../../hooks/useScrollToTop'
import styles from './ImageFinderPage.module.scss'

export const ImageFinderPage: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [firstload, setFirstLoad] = useState<boolean>(false)
  const [statusQuery, setStatusQuery] = useState<boolean>(false)

  const { dataImages, error, searchPhotos, loading } = useFetchPhotos()

  const galleryRef = useRef<HTMLDivElement | null>(null)

  useScrollToTop(statusQuery)

  const handleSearch = async () => {
    if (query.trim()) {
      setFirstLoad(true)
      setPage(1)
      await searchPhotos(query, 1)
      setStatusQuery(true)
      setFirstLoad(false)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleChange = (value: string) => {
    setQuery(value)
  }

  const loadMoreImages = useCallback(async () => {
    if (dataImages.totalPages && page < dataImages.totalPages && !loading) {
      setPage((prevPage) => prevPage + 1)
      await searchPhotos(query, page + 1, 20)
    }
  }, [dataImages.totalPages, page, loading, searchPhotos, query])

  const checkIfGalleryVisible = useCallback(() => {
    if (galleryRef.current) {
      const rect = galleryRef.current.getBoundingClientRect()
      const isVisible = window.innerHeight > rect.bottom
      if (isVisible) {
        loadMoreImages()
      }
    }
  }, [loadMoreImages])

  useEffect(() => {
    if (statusQuery && !loading) {
      checkIfGalleryVisible()
    }
  }, [statusQuery, loading, checkIfGalleryVisible])

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    if (scrollY + windowHeight >= documentHeight - 200 && !loading) {
      loadMoreImages()
    }
  }, [loadMoreImages, loading])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div className={`${styles['imageFinderContainer']} ${statusQuery ? styles.searching : ''}`}>
      <div
        className={`${styles['searchWrapperPanele']} ${statusQuery ? styles.searching : ''}`}>
        <div
          className={`${styles['searchWrapperContainer']} ${statusQuery ? styles.searching : ''}`}>
          <SearchInput
            onSearch={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={'Телефоны, яблоки, груши...'}
          />
          <Button onClick={handleSearch} title={'Искать'} />
        </div>
      </div>
      {firstload ? (
        <Loader />
      ) : (
        <ImageGallery
          statusQuery={statusQuery}
          images={dataImages.images}
          error={error}
          ref={galleryRef}
        />
      )}
    </div>
  )
}
