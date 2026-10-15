type SeoProps = {
  title: string
  description?: string
}

export const Seo = ({ title, description }: SeoProps) => {
  return (
    <>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
    </>
  )
}
