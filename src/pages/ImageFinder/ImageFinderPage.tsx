import { useState } from 'react'
import { useFetchPhotos } from '../../hooks/useFetchPhotos'
import { SearchInput } from '../../components/common/SearchInput'
import { Button } from '../../components/common/Button'
import { ImageGallery } from '../../components/ImageGallery'
import { Loader } from '../../components/common/Loader'
import { useScrollToTop } from '../../hooks/useScrollToTop'
import styles from './ImageFinderPage.module.scss'

export const ImageFinderPage = () => {
  const [query, setQuery] = useState('')
  const [statusQuery, setStatusQuery] = useState(false)
  const { images, loading, error, searchPhotos } = useFetchPhotos()

  useScrollToTop(statusQuery)

  const handleSearch = () => {
    if (query.trim()) {
      setStatusQuery(true)
      searchPhotos(query)
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

  return (
    <div
      className={`${styles['imageFinderContainer']} ${statusQuery ? styles.searching : ''}`}>
      <div className={`${styles['searchWrapperPanele']} `}>
        <SearchInput
          onSearch={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={'Телефоны, яблоки, груши...'}
        />
        <Button onClick={handleSearch} title={'Искать'} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        statusQuery && <ImageGallery images={images} error={error} />
      )}
    </div>
  )
}
