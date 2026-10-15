type HeroRankTagProps = {
  rank: number
}

export const HeroRankTag = ({ rank }: HeroRankTagProps) => {
  return (
    <p className="m-0 inline-flex rounded-md bg-background/95 px-2.5 py-1 font-mono text-xs font-semibold tracking-[0.08em] text-brand uppercase shadow-[0_0_0_1px_rgba(0,0,0,0.45)] backdrop-blur-sm">
      #{rank} Trending this week
    </p>
  )
}
