export const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-background px-6 pt-8 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:px-8 sm:pb-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <a
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-foreground/70"
        >
          <img
            src="/tmdb-logo.svg"
            alt="TMDB"
            width={72}
            height={31}
            className="h-3.5 w-auto"
          />
        </a>
        <p className="m-0 font-mono text-xs leading-relaxed text-muted-foreground">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
    </footer>
  )
}
