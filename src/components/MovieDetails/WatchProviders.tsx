import { PageSection } from '@/components/ui/page-section'
import { SectionLabel } from '@/components/ui/section-label'
import type { StreamingProviders, WatchProvider } from '@/types/movieDetails'
import { getProviderLogoUrl } from '@/utils/formatMovie'

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
      <h3 className="m-0 font-mono text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
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

export const WatchProviders = ({ providers }: WatchProvidersProps) => {
  const stream = providers?.flatrate ?? []
  const hasAny = stream.length > 0

  if (!hasAny) {
    return (
      <PageSection>
        <SectionLabel className="mb-3">Where to watch</SectionLabel>
        <p className="m-0 text-sm text-muted-foreground">
          Streaming availability is currently unavailable.
        </p>
      </PageSection>
    )
  }

  return (
    <PageSection>
      <SectionLabel className="mb-6">Where to watch</SectionLabel>
      <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:gap-12">
        <ProviderGroup label="Stream" items={stream} />
      </div>
    </PageSection>
  )
}
