import { useFavorites } from "../store/useFavourites";

// function Show({ when, children, fallback = null }) {
//   return when ? children : fallback;
// }

export function MovieCard({ show }) {
  const { favorites, toggle } = useFavorites();
  const isFav = favorites.some((f) => f.id === show.id);

  return (
    <div className="group relative">
      <div className="overflow-hidden rounded-2xl bg-white/5 aspect-[2/3] border border-white/10 group-hover:border-white/20 transition-all">
        <img
          src={show.image?.medium}
          alt={show.name}
          className="ww-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-medium text-[13px] leading-tight truncate text-white/90 group-hover:text-white">{show.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-xs text-white/40">⭐ {show.rating?.average || "N/A"}</p>
          <button
            onClick={(e) => {
              e.stopPropagation(); //prevents opening detail when clicking heart
              toggle(show);
            }}
            className={`text-[11px] px-2.5 py-1 rounded-full transition-all ${isFav ? 'bg-white text-black' : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'}`}
          >
            {isFav ? '❤️ Saved' : '🖤 Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
