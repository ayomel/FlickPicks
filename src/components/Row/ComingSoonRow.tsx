import { BackdropCard } from '@/components/Row/BackdropCard'
import { MediaRow } from '@/components/Row/MediaRow'
import { useUpcomingQuery } from '@/hooks/useUpcomingQuery'

export const ComingSoonRow = () => {
  const { data, isLoading, isError } = useUpcomingQuery()

  if (isLoading) {
    return (
      <MediaRow
        label="Coming soon"
        title="In theaters near you"
        variant="backdrop"
        isLoading
        errorMessage="Couldn't load upcoming movies."
      >
        {null}
      </MediaRow>
    )
  }

  if (isError) {
    return (
      <MediaRow
        label="Coming soon"
        title="In theaters near you"
        variant="backdrop"
        isError
        errorMessage="Couldn't load upcoming movies."
      >
        {null}
      </MediaRow>
    )
  }

  const movies = data?.results ?? []

  return (
    <MediaRow
      label="Coming soon"
      title="In theaters near you"
      variant="backdrop"
      isEmpty={movies.length === 0}
      emptyMessage="No upcoming titles right now."
      errorMessage="Couldn't load upcoming movies."
    >
      {movies.map((movie) => (
        <li key={movie.id}>
          <BackdropCard movie={movie} />
        </li>
      ))}
    </MediaRow>
  )
}
