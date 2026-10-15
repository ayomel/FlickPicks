export const HeroOverlay = () => {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-background via-background/70 to-transparent sm:h-52" />
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-background via-background/80 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[55%] bg-linear-to-r from-background/90 via-background/45 to-transparent" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 20% 80%, var(--brand-glow), transparent 55%)',
        }}
      />
    </div>
  )
}
