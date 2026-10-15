import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export const NotFound = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background px-6 pt-16 text-center">
      <h1 className="m-0 text-2xl font-semibold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="m-0 text-sm text-muted-foreground">
        This route does not exist.
      </p>
      <Link to="/">
        <Button variant="secondary">Back to home</Button>
      </Link>
    </div>
  )
}
