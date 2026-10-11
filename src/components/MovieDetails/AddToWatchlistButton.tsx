import { Check, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAddToWatchlistMutation } from '@/hooks/useAddToWatchlistMutation'
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
  const { mutate, isPending, isSuccess, isError } = useAddToWatchlistMutation()

  const onWatchlist = isOnWatchlist || isSuccess

  const label = watchlistLoading
    ? 'Watchlist…'
    : onWatchlist
      ? 'On watchlist'
      : isPending
        ? 'Adding…'
        : isError
          ? 'Try again'
          : addLabel

  return (
    <Button
      variant="secondary"
      isDisabled={watchlistLoading || onWatchlist || isPending}
      onPress={() => mutate(movieId)}
      aria-live="polite"
      aria-pressed={onWatchlist}
      className={cn(
        onWatchlist &&
          'border-brand/30 bg-brand-soft text-brand hover:bg-brand-soft',
      )}
    >
      {onWatchlist ? (
        <Check data-icon="inline-start" />
      ) : (
        <Plus data-icon="inline-start" />
      )}
      {label}
    </Button>
  )
}
