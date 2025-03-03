import React, { useState } from 'react'
import styles from './SearchInput.module.scss'
import SearchIcon from '../../../assets/icons/SearchIcon'
import ClearIcon from '../../../assets/icons/ClearIcon'

interface SearchInputProps {
  placeholder?: string
  onSearch: (value: string) => void
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onSearch,
  onKeyDown,
}) => {
  const [query, setQuery] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  const clearInput = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className={styles['search-input-container']}>
      <SearchIcon />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={styles['search-input']}
        onKeyDown={onKeyDown}
      />
      {query && <ClearIcon onClick={clearInput} />}
    </div>
  )
}
