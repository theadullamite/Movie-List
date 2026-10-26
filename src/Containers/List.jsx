// app/components/ShowList.tsx
'use client'

import { useQuery } from '@tanstack/react-query'

const Show = {
  id: number,
  name: string,
  genres: string[],
  rating: { average: number | null }
}

async function fetchShows(): Promise<Show[]> {
  const res = await fetch('https://tvmaze.com')
  if (!res.ok) {
    throw new Error('Failed to fetch TV shows')
  }
  return res.json()
}

export function ShowList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['tvmaze-shows'],
    queryFn: fetchShows,
  })

  if (isLoading) return <p>Loading TV shows...</p>
  if (isError) return <p>Error: {(error as Error).message}</p>

  return (
    <ul>
      {data?.slice(0, 10).map((show) => (
        <li key={show.id}>
          <strong>{show.name}</strong> — Genres: {show.genres.join(', ')} 
          (Rating: {show.rating.average ?? 'N/A'})
        </li>
      ))}
    </ul>
  )
}
