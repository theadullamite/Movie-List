import { useFavorites } from "../store/useFavourites";

function Show({ when, children, fallback = null }) {
  return when ? children : fallback;
}

export function MovieCard({ show }) {
  const { favorites, toggle } = useFavorites();
  const isFav = favorites.some((f) => f.id === show.id);

  return (
    <div className="rounded-xl border p-3 shadow">
      <img
        src={show.image?.medium}
        alt={show.name}
        className="rounded-lg w-full"
      />
      <h3 className="font-semibold mt-2">{show.name}</h3>
      <p className="text-sm"> {show.rating?.average || "N/A"}</p>

      <button
        onClick={(e) => {
          e.stopPropagation(); //prevents opening detail when clicking heart
          toggle(show);
        }}
        className="mt-2 text-sm"
      >
        <Show when={isFav} fallback="Favorite">
          Favorited
        </Show>
      </button>
    </div>
  );
}
