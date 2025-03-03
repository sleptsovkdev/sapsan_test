import React, { useState } from 'react'
import styles from './ImageGallery.module.scss'
import { Button } from '../common/Button'
import CloseIcon from '../../assets/icons/CloseIcon'

interface ImageGalleryProps {
  images: string[]
  error: string | null
  statusQuery: boolean
}

export const ImageGallery = ({
  ref,
  images,
  error,
  statusQuery,
}: ImageGalleryProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const openImage = (url: string) => {
    setSelectedImage(url)
  }

  const closeImage = () => {
    setSelectedImage(null)
  }

  let statusMessage = null

  if (error) {
    statusMessage = <p>Произошла ошибка поиска</p>
  } else if (!images.length) {
    statusMessage = <p>К сожалению, поиск не дал результатов</p>
  }
  if (!statusQuery) return
  return (
    <div
      className={`${styles['image-gallery']} ${statusMessage ? styles.error : ''}`}
      ref={ref}>
      {statusMessage && (
        <div className={styles['status-message']}>{statusMessage}</div>
      )}

      {!error && images.length > 0 && (
        <div className={styles['image-gallery-content']}>
          {images.map((url, index) => (
            <img
              key={url}
              src={url}
              alt={`img-${index}`}
              className={styles['image-item']}
              onClick={() => openImage(url)}
            />
          ))}
        </div>
      )}

      {selectedImage && (
        <div className={styles['fullscreen-overlay']}>
          <div className={styles['fullscreen-image-container']}>
            <img
              src={selectedImage}
              alt="Fullscreen view"
              className={styles['fullscreen-image']}
            />
            <Button
              onClick={closeImage}
              icon={<CloseIcon />}
              className={styles['close-button']}
            />
          </div>
        </div>
      )}
    </div>
  )
}
