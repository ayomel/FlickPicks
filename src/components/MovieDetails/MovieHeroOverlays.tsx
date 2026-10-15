export const MovieHeroOverlays = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      {/* Strong left column scrim so title/tagline stay readable over bright backdrops */}
      <div className="absolute inset-y-0 left-0 w-full max-w-3xl bg-linear-to-r from-background via-background/90 via-55% to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-background/70 via-background/20 via-50% to-transparent to-75%" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/45 via-40% to-transparent" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 15% 85%, var(--brand-glow), transparent 50%)',
        }}
      />
    </div>
  )
}
