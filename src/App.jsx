import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useShows } from "./hooks/useShows";
import { MovieCard } from "./Components/MovieCard";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieApp />
    </QueryClientProvider>
  );
}

function MovieApp() {
  const { data, isLoading } = useShows();
  const [search, setSearch] = useState("");
  const [selectId, setSelectId] = useState(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] grid place-items-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/50 text-sm">Loading shows...</p>
        </div>
      </div>
    );
  }

  if (selectId) {
    const show = data.find((s) => s.id === selectId);
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="max-w-5xl mx-auto p-6 md:p-10">
          <button
            onClick={() => setSelectId(null)}
            className="mb-8 text-sm text-white/60 hover:text-white flex items-center gap-2"
          >
            IJ Back to browse
          </button>
          <div className="grid md:grid-cols-[320px_1fr] gap-10">
            <img
              src={show.image?.original}
              className="rounded-2xl w-full shadow-2xl"
            />
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{show.name}</h1>
              <div className="flex gap-2 mt-4">
                <span className="bg-white/10 px-3 py-1 rounded-full text-xs">
                  ⭐ {show.rating?.average || "N/A"}
                </span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-xs">
                  {show.language}
                </span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-xs">
                  {show.genres?.[0]}
                </span>
              </div>
              <div
                className="mt-6 text-white/70 leading-relaxed prose prose-invert"
                dangerouslySetInnerHTML={{ __html: show.summary }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filtered = data.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto p-4 md:p-6 flex justify-between items-center gap-4">
          <h1 className="text-xl font-bold tracking-light">CINEMA <span className="font-light text-white/50">.io</span></h1>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 240 shows..."
            className="bg-white/10 border border-white/10 rounded-full px-5 py-2.5 w-full max-w-sm text-sm placeholder: text-white/40 focus:outline-none focus:bg-white focus:border-white/20"
          />
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <p className="text-white/40 text-sm mb-6">{filtered.length} shows | Click to view </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filtered.slice(0, 40).map((show) => (
            <div key={show.id} onClick={() => setSelectId(show.id)} className="cursor-pointer">
              <MovieCard show={show} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
