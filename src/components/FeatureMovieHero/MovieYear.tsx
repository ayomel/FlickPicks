type MovieYearProps = {
  releaseDate: string
}

export const MovieYear = ({ releaseDate }: MovieYearProps) => {
  const year = releaseDate.slice(0, 4)

  if (!year) return null

  return <p className="m-0 font-mono text-xs text-muted-foreground">{year}</p>
}
