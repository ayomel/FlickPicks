import { PageSection } from '@/components/ui/page-section'
import type { StreamingProviders, WatchProvider } from '@/types/movieDetails'
import { getProviderLogoUrl } from '@/utils/formatMovie'
import { cn } from '@/lib/utils'

type WatchProvidersProps = {
  providers?: StreamingProviders
}

const ProviderGroup = ({
  label,
  items,
}: {
  label: string
  items: WatchProvider[]
}) => {
  if (!items.length) return null

  return (
    <div className="flex flex-col gap-3">
      <h3 className="m-0 font-mono text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
        {label}
      </h3>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {items.map((provider) => (
          <li key={`${label}-${provider.provider_id}`}>
            <div
              className="flex size-11 items-center justify-center overflow-hidden rounded-md border border-border bg-card p-1.5 transition-colors hover:bg-muted"
              title={provider.provider_name}
            >
              <img
                src={getProviderLogoUrl(provider.logo_path)}
                alt={provider.provider_name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Attribution = ({
  link,
  className,
}: {
  link?: string
  className?: string
}) => {
  return (
    <p className={cn('m-0 font-mono text-xs text-muted-foreground', className)}>
      US availability via TMDB
      {link ? (
        <>
          {' · '}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:text-foreground hover:underline"
          >
            JustWatch
          </a>
        </>
      ) : (
        ' / JustWatch'
      )}
      .
    </p>
  )
}

export const WatchProviders = ({ providers }: WatchProvidersProps) => {
  const stream = providers?.flatrate ?? []
  const rent = providers?.rent ?? []
  const buy = providers?.buy ?? []
  const hasAny = stream.length > 0 || rent.length > 0 || buy.length > 0

  if (!hasAny) {
    return (
      <PageSection>
        <h2 className="mb-3 font-mono text-xs font-semibold tracking-[0.08em] text-brand uppercase">
          Where to watch
        </h2>
        <div className="rounded-lg border border-border bg-card px-4 py-5">
          <p className="m-0 text-sm text-foreground">
            No streaming options listed yet.
          </p>
          <Attribution link={providers?.link} className="mt-3" />
        </div>
      </PageSection>
    )
  }

  return (
    <PageSection>
      <h2 className="mb-6 font-mono text-xs font-semibold tracking-[0.08em] text-brand uppercase">
        Where to watch
      </h2>
      <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:gap-12">
        <ProviderGroup label="Stream" items={stream} />
        <ProviderGroup label="Rent" items={rent} />
        <ProviderGroup label="Buy" items={buy} />
      </div>
      <Attribution link={providers?.link} className="mt-6" />
    </PageSection>
  )
}
