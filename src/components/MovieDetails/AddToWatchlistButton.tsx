import { useEffect } from 'react'
import { Check, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAddToWatchlistMutation } from '@/hooks/useAddToWatchlistMutation'

type AddToWatchlistButtonProps = {
  movieId: number
}

export const AddToWatchlistButton = ({ movieId }: AddToWatchlistButtonProps) => {
  const { mutate, isPending, isSuccess, isError, reset } =
    useAddToWatchlistMutation()

  useEffect(() => {
    if (!isSuccess) return
    const timer = window.setTimeout(() => reset(), 2500)
    return () => window.clearTimeout(timer)
  }, [isSuccess, reset])

  const label = isPending
    ? 'Adding…'
    : isSuccess
      ? 'Added to watchlist'
      : isError
        ? 'Try again'
        : 'Add to watchlist'

  return (
    <Button
      variant="secondary"
      isDisabled={isPending || isSuccess}
      onPress={() => mutate(movieId)}
      aria-live="polite"
    >
      {isSuccess ? (
        <Check data-icon="inline-start" />
      ) : (
        <Plus data-icon="inline-start" />
      )}
      {label}
    </Button>
  )
}
