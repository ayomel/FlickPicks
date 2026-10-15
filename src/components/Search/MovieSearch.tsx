import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { MIN_SEARCH_LENGTH, useSearchQuery } from '@/hooks/useSearchQuery'
import { SearchDropdown, SearchDropdownMessage } from './SearchDropdown'
import { SearchInput } from './SearchInput'
import { SearchResultRow } from './SearchResultRow'

type MovieSearchProps = {
  autoFocus?: boolean
}

export const MovieSearch = ({ autoFocus = false }: MovieSearchProps) => {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const instanceId = useId()
  const listboxId = `movie-search-listbox-${instanceId}`

  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(autoFocus)
  const [activeIndex, setActiveIndex] = useState(0)

  const debouncedQuery = useDebouncedValue(query, 300)
  const {
    data: results = [],
    isLoading,
    isError,
  } = useSearchQuery(debouncedQuery)

  const trimmedDebounced = debouncedQuery.trim()
  const showDropdown = open && trimmedDebounced.length >= MIN_SEARCH_LENGTH

  const selectMovie = useCallback(
    (id: number) => {
      navigate(`/movies/${id}`)
      setQuery('')
      setOpen(false)
      setActiveIndex(0)
    },
    [navigate],
  )

  const resultsKey = results.map((movie) => movie.id).join(',')
  const [indexedResultsKey, setIndexedResultsKey] = useState(resultsKey)
  if (resultsKey !== indexedResultsKey) {
    setIndexedResultsKey(resultsKey)
    setActiveIndex(0)
  }

  useEffect(() => {
    if (!autoFocus) return
    inputRef.current?.focus()
  }, [autoFocus])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (!rootRef.current?.contains(target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleInputKeyDown: ComponentProps<typeof SearchInput>['onKeyDown'] = (
    event,
  ) => {
    if (event.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
      return
    }

    if (!showDropdown || results.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((prev) => Math.max(prev - 1, 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const movie = results[activeIndex]
      if (movie) selectMovie(movie.id)
    }
  }

  const activeOptionId =
    showDropdown && results[activeIndex]
      ? `movie-search-option-${instanceId}-${results[activeIndex].id}`
      : undefined

  return (
    <div ref={rootRef} className="relative w-full">
      <SearchInput
        inputRef={inputRef}
        value={query}
        onChange={setQuery}
        onFocus={() => setOpen(true)}
        onKeyDown={handleInputKeyDown}
        listboxId={listboxId}
        isExpanded={showDropdown}
        activeOptionId={activeOptionId}
      />

      <SearchDropdown listboxId={listboxId} isOpen={showDropdown}>
        {isLoading ? (
          <SearchDropdownMessage>Searching…</SearchDropdownMessage>
        ) : isError ? (
          <SearchDropdownMessage>
            Couldn&apos;t load results. Try again.
          </SearchDropdownMessage>
        ) : results.length === 0 ? (
          <SearchDropdownMessage>No movies found.</SearchDropdownMessage>
        ) : (
          results.map((movie, index) => (
            <SearchResultRow
              key={movie.id}
              movie={movie}
              optionId={`movie-search-option-${instanceId}-${movie.id}`}
              isActive={index === activeIndex}
              onSelect={selectMovie}
              onHover={() => setActiveIndex(index)}
            />
          ))
        )}
      </SearchDropdown>
    </div>
  )
}
