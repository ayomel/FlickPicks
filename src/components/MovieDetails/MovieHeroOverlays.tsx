export const MovieHeroOverlays = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/25 sm:via-background/80 sm:to-background/15" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/90 to-background/55 sm:via-background/45 sm:to-background/30" />
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-background via-background/70 to-transparent sm:hidden" />
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
