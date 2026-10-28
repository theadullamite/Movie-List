import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useShows } from './hooks/useShows'
import { MovieCard } from './Components/MovieCard'
import "./App.css";

const queryClient = new QueryClient()


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieCard />
    </QueryClientProvider>
  );
}
