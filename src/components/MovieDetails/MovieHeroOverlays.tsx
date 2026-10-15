export const MovieHeroOverlays = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-background/15" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/45 to-background/30" />
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
