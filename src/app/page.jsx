'use client'
import { useShows } from '@/hooks/useShows'
import { MovieCard } from '@/Components/MovieCard'

export default function Home() {
    const { data, isLoading } = useShows()

    if (isLoading) {
        return <p className='p-6'>Loading...</p>
    }

    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 p-6'>
            {data?.slice(0, 40).map(show => (
                <MovieCard key={show.id} show={show} />
            ))}
        </div>
    )
}