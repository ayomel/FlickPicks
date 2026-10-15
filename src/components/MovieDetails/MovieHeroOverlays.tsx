export const MovieHeroOverlays = () => {
  // lg+: solid through contentLeft + max-w-2xl, then soft fade.
  // contentLeft is max(2.5rem, (100vw - 72rem) / 2) for the padded max-w-6xl column.
  const lgColumnStop = 'max(46rem, calc((100vw - 72rem) / 2 + 43.5rem))'

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <div className="absolute inset-0 bg-linear-to-t from-background from-10% via-background/70 via-40% to-transparent to-75% lg:hidden" />
      <div className="absolute inset-y-0 left-0 w-[min(100%,20rem)] bg-linear-to-r from-background/55 via-background/25 to-transparent lg:hidden" />

      <div
        className="absolute inset-y-0 left-0 hidden lg:block"
        style={{
          width: `calc(${lgColumnStop} + 10rem)`,
          background: `linear-gradient(to right, var(--background) 0%, var(--background) ${lgColumnStop}, color-mix(in srgb, var(--background) 55%, transparent) calc(${lgColumnStop} + 4rem), transparent calc(${lgColumnStop} + 10rem))`,
        }}
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-linear-to-t from-background via-background/50 to-transparent lg:h-[22%]" />
      <div
        className="absolute inset-0 opacity-50 lg:opacity-40"
        style={{
          background:
            'radial-gradient(circle at 15% 85%, var(--brand-glow), transparent 50%)',
        }}
      />
    </div>
  )
}
