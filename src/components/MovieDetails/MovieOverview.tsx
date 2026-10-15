import { SectionLabel } from '@/components/ui/section-label'

type MovieOverviewProps = {
  overview: string
}

export const MovieOverview = ({ overview }: MovieOverviewProps) => {
  if (!overview) return null

  return (
    <section>
      <SectionLabel className="mb-3">Overview</SectionLabel>
      <p className="m-0 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {overview}
      </p>
    </section>
  )
}
