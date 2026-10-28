import { useQuery } from "@tanstack/react-query";

export function useShows() {
    return useQuery({
        queryKey: ['shows'],
        queryFn: async () => {
            const res = await fetch('https://api.tvmaze.com/shows')
            return res.json()
        }
    })
}