export const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-background px-6 pt-8 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:px-8 sm:pb-8 lg:px-10">
      <p className="m-0 mx-auto max-w-6xl font-mono text-xs leading-relaxed text-muted-foreground">
        © FlickPick · Movie data & images from TMDB. This product uses the TMDB
        API but is not endorsed by TMDB.
      </p>
    </footer>
  )
}
