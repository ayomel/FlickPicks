import { Skeleton } from '@/components/ui/skeleton'

export const MovieDetailsSkeleton = () => {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="relative min-h-[55svh] px-6 pb-10 pt-20 sm:min-h-[65svh] sm:px-8 sm:pt-24 lg:px-10">
        <Skeleton className="absolute inset-0 rounded-none bg-muted" />
        <div className="relative z-10 mx-auto flex min-h-[45svh] max-w-6xl flex-col justify-between">
          <Skeleton className="h-4 w-32 bg-muted-foreground/20" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-full max-w-xl bg-muted-foreground/20" />
            <Skeleton className="h-6 w-full max-w-md bg-muted-foreground/20" />
            <Skeleton className="h-5 w-40 bg-muted-foreground/20" />
          </div>
        </div>
      </div>
      <div className="px-6 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="space-y-4">
            <Skeleton className="h-3 w-24 bg-muted-foreground/20" />
            <Skeleton className="h-20 w-full max-w-3xl bg-muted-foreground/20" />
            <Skeleton className="h-10 w-48 bg-muted-foreground/20" />
          </div>
          <Skeleton className="aspect-[2/3] w-full bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  )
}
