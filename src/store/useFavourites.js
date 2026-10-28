import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFavorites = create(
    persist(
        (set, get) => ({
            favorites: [],
            toggle: (show) => {
                const exists = get().favorites.find(s => s.id === show.id)
                if (exists) {
                    set({ favorites: get().favorites.filter(s => s.id !== show.id) })
                } else {
                    set({ favorites: [...get().favorites, show] })
                }
            }
        }),
        { name: 'favorites-storage'}
    )
)