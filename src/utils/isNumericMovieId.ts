export const isNumericMovieId = (id: string | undefined): id is string =>
  typeof id === 'string' && /^\d+$/.test(id)
