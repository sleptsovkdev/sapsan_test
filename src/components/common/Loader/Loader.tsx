import React from 'react'
import styles from './Loader.module.scss'
import LoadingIcon from '../../../assets/icons/LoadingIcon'

export const Loader: React.FC = () => {
  return (
    <div className={styles['loader']}>
      <LoadingIcon />
    </div>
  )
}
