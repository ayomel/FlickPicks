export const MovieHeroOverlays = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      {/* Strong left column scrim so title and tagline stay readable over bright backdrops */}
      <div className="absolute inset-y-0 left-0 w-full max-w-[min(100%,calc(42rem+2.5rem))] bg-linear-to-r from-background via-background/90 via-80% to-background/90" />
      <div className="absolute inset-y-0 left-[min(100%,calc(42rem+2.5rem))] right-0 bg-linear-to-r from-background/90 to-transparent to-40%" />
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
