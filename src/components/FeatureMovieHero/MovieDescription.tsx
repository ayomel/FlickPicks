type MovieDescriptionProps = {
  overview: string
}

export const MovieDescription = ({ overview }: MovieDescriptionProps) => {
  if (!overview) return null

  return (
    <p className="m-0 line-clamp-3 max-w-md text-base leading-relaxed text-muted-foreground">
      {overview}
    </p>
  )
}
