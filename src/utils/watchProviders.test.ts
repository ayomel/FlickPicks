import { describe, expect, it } from 'vitest'
import { providerInitials, uniqueProviders } from './watchProviders'

describe('uniqueProviders', () => {
  it('keeps the first entry for duplicate provider ids', () => {
    expect(
      uniqueProviders([
        {
          provider_id: 1,
          provider_name: 'Netflix',
          logo_path: '/n.jpg',
          display_priority: 1,
        },
        {
          provider_id: 1,
          provider_name: 'Netflix',
          logo_path: '/dup.jpg',
          display_priority: 2,
        },
        {
          provider_id: 2,
          provider_name: 'Apple TV',
          logo_path: '/a.jpg',
          display_priority: 1,
        },
      ]).map((provider) => provider.provider_id),
    ).toEqual([1, 2])
  })
})

describe('providerInitials', () => {
  it('builds one or two letter initials from the provider name', () => {
    expect(providerInitials('Netflix')).toBe('NE')
    expect(providerInitials('Apple TV')).toBe('AT')
    expect(providerInitials('')).toBe('?')
  })
})
