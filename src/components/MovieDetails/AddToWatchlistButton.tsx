import { Check, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAddToWatchlistMutation } from '@/hooks/useAddToWatchlistMutation'
import { useRemoveFromWatchlistMutation } from '@/hooks/useRemoveFromWatchlistMutation'
import { useIsMovieOnWatchlist } from '@/hooks/useWatchlistQuery'
import { cn } from '@/lib/utils'

type AddToWatchlistButtonProps = {
  movieId: number
  addLabel?: string
}

export const AddToWatchlistButton = ({
  movieId,
  addLabel = 'Add to watchlist',
}: AddToWatchlistButtonProps) => {
  const { isOnWatchlist, isLoading: watchlistLoading } =
    useIsMovieOnWatchlist(movieId)
  const addMutation = useAddToWatchlistMutation()
  const removeMutation = useRemoveFromWatchlistMutation()

  const isAdding = addMutation.isPending
  const isRemoving = removeMutation.isPending
  const isPending = isAdding || isRemoving
  const isError = addMutation.isError || removeMutation.isError

  const label = watchlistLoading
    ? 'Watchlist…'
    : isRemoving
      ? 'Removing…'
      : isAdding
        ? 'Adding…'
        : isOnWatchlist
          ? 'On watchlist'
          : isError
            ? 'Try again'
            : addLabel

  const handlePress = () => {
    if (isOnWatchlist) {
      removeMutation.mutate(movieId)
    } else {
      addMutation.mutate(movieId)
    }
  }

  return (
    <Button
      variant="secondary"
      isDisabled={watchlistLoading || isPending}
      onPress={handlePress}
      aria-live="polite"
      aria-pressed={isOnWatchlist}
      aria-label={isOnWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
      className={cn(
        isOnWatchlist &&
          'border-brand/30 bg-brand-soft text-brand hover:border-border hover:bg-muted hover:text-foreground',
      )}
    >
      {isOnWatchlist ? (
        <Check data-icon="inline-start" />
      ) : (
        <Plus data-icon="inline-start" />
      )}
      {label}
    </Button>
  )
}
