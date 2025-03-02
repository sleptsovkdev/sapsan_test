import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  title?: string
  className?: string
  onClick?: () => void
  icon?: React.ReactNode
  style?: React.CSSProperties
}

export const Button: React.FC<ButtonProps> = ({
  title,
  className = '',
  onClick,
  icon,
  style,
}) => {
  return (
    <>
      {icon ? (
        <div
          className={`${styles['icon']} ${className}`}
          onClick={onClick}
          style={style}>
          {icon}
        </div>
      ) : (
        <button
          onClick={onClick}
          className={`${styles['button']} ${className}`}
          type="button"
          style={style}>
          {title}
        </button>
      )}
    </>
  )
}
