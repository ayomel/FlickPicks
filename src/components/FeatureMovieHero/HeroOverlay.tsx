export const HeroOverlay = () => {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/75 to-background/20" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-background/55" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 20% 80%, rgba(212, 42, 32, 0.1), transparent 55%)',
        }}
      />
    </div>
  )
}
