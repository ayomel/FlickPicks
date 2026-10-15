import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../services/apiClient'
import type { UpcomingResponse } from '../types/upcoming'

export const useUpcomingQuery = () => {
  return useQuery({
    queryKey: ['upcoming'],
    queryFn: async () => {
      const { data } = await apiClient.get<UpcomingResponse>('/movies/upcoming')
      return data
    },
  })
}
