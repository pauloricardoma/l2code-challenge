import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { QUERY_KEYS } from "../constants/query-keys";
import { MoviesService } from "../service/movies.service";

export const useQueryMovies = (query?: string) => {
  const { 
    data,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    isLoading,
    error,
    refetch,
    fetchNextPage 
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.MOVIES, query],
    queryFn: ({ pageParam = 1 }) => MoviesService.list(pageParam, query),
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) {
        return undefined;
      }
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });

  const defaultData = useMemo(() => [], []);

  return { 
    data: data?.pages.flatMap(page => page.results) ?? defaultData, 
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    isLoading,
    error,
    refetch,
    fetchNextPage
  };
}
