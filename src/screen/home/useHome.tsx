import { useDebounce } from "@/src/hooks/useDebounce";
import { useQueryMovies } from "@/src/hooks/useQueryMovies";
import { useQueryMoviesSchedules } from "@/src/hooks/useQueryMoviesSchedules";
import { useQueryMoviesSettings } from "@/src/hooks/useQueryMoviesSettings";
import { useCallback, useState } from "react";
import { Movie } from "../../types/movie.model";
import MovieCard from "./components/MovieCard";

const useHome = () => {
  const { data: settings } = useQueryMoviesSettings();
  const { data: schedulesData } = useQueryMoviesSchedules();

  const [query, setQuery] = useState<string>('');

  const {
    data: movies,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useQueryMovies(query);

  const debounce = useDebounce<string>((value) => {
    setQuery(value);
  }, 1000);

  const renderItem = useCallback(({ item }: { item: Movie }) => {
    const settingsItem = item.id in settings
      ? settings[item.id]
      : null;
    const schedulesItem = item.id in schedulesData.map
      ? schedulesData.map[item.id]
      : null;

    return (
      <MovieCard
        item={item}
        settings={settingsItem}
        schedules={schedulesItem}
      />
    )
  }, [settings, schedulesData.map]);

  return {
    movies,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    renderItem,
    debounce,
  };
}

export default useHome;
