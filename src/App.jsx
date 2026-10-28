import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useShows } from './hooks/useShows'
import { MovieCard } from './Components/MovieCard'
import "./App.css";

const queryClient = new QueryClient()


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieApp />
    </QueryClientProvider>
  );
}

function MovieApp() {
  const { data, isLoading } = useShows()
  const [search, setSearch] = useState('')
  const [selectId, setSelectId] = useState(null)

  if (isLoading) return <p className="p-6">Loading shows...</p>

  if (selectId) {
    const show = data.find(s => s.id === selectId)
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <button onClick={() => setSelectId(null)} className="mb-4 underline">Back</button>
        <h1 className="text-3xl font-bold">{show.name}</h1>
        <img src={show.image?.original} className="my-4 rounded-xl"/>
        <div dangerouslySetInnerHTML={{ __html: show.summary}} />
      </div>
    )
  }

  const filtered = data.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="p-6">
      <input
      value={search} 
      onChange={e => setSearch(e.target.value)}
      placeholder="Search 240 shows..."
      className="border p-2 rounded w-full max-w-sm mb-6"
      />
      <div>
        {filtered.slice(0, 40).map(show => (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MovieCard show={show} />
          </div>
        ))}
      </div>
    </main>
  )
}
