import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Seo } from '@/components/Seo'

type MovieDetailsErrorProps = {
  notFound?: boolean
}

export const MovieDetailsError = ({
  notFound = false,
}: MovieDetailsErrorProps) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background px-6 pt-16 text-center">
      <Seo
        title={
          notFound
            ? 'Movie not found · FlickPick'
            : 'Something went wrong · FlickPick'
        }
        description={
          notFound
            ? 'No movie matches this id on FlickPick.'
            : 'FlickPick could not load this movie.'
        }
        noindex
      />
      <h1 className="m-0 text-2xl font-semibold tracking-tight text-foreground">
        {notFound ? 'Movie not found' : 'Something went wrong'}
      </h1>
      <p className="m-0 text-sm text-muted-foreground">
        {notFound
          ? 'No movie matches this id.'
          : 'We could not load this movie.'}
      </p>
      <Link to="/">
        <Button variant="secondary">Back to home</Button>
      </Link>
    </div>
  )
}
