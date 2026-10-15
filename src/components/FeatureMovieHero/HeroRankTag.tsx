type HeroRankTagProps = {
  rank: number
}

export const HeroRankTag = ({ rank }: HeroRankTagProps) => {
  return (
    <p className="m-0 font-mono text-xs font-semibold tracking-[0.08em] text-brand uppercase">
      #{rank} Trending this week
    </p>
  )
}
