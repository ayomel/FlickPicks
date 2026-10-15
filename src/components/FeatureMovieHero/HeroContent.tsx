import type { ReactNode } from 'react'

type HeroContentProps = {
  children: ReactNode
}

export const HeroContent = ({ children }: HeroContentProps) => {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-4 px-6 pb-[calc(7.5rem+env(safe-area-inset-bottom))] pt-40 sm:px-8 sm:pb-32 lg:max-w-3xl lg:px-10">
      {children}
    </div>
  )
}
