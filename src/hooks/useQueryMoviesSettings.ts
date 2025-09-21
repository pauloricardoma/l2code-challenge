import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { QUERY_KEYS } from "../constants/query-keys";
import { queryClient } from "../context/query-client.context";
import { MovieSettingsService } from "../service/movie-settings.service";
import {
  CreateMovieSettings,
  MovieSettings,
  MovieSettingsMap,
  UpdateMovieSettings
} from "../types/movie-settings.model";

export const useQueryMoviesSettings = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.MOVIES_SETTINGS],
    queryFn: () => MovieSettingsService.list(),
  });

  const settingsData = useMemo(() => {
    const map = {} as MovieSettingsMap;
    if (data) {
      for (const item of data) {
        if (!(item.movie_id in map)) {
          map[item.movie_id] = item;
        }
      }
    }
    return map;
  }, [data]);

  return { data: settingsData, isLoading };
}

export const useQueryCreateMovieSettings = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (variable: CreateMovieSettings) => MovieSettingsService.create(variable),
    onSuccess: async (data) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.MOVIES_SETTINGS] });

      queryClient.setQueryData<MovieSettings[]>(
        [QUERY_KEYS.MOVIES_SETTINGS], 
        (oldData) => {
          if (oldData) {
            return [...oldData, data];
          }
          return [data];
        });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { createMovieSettings: mutateAsync, isLoading: isPending };
}

export const useQueryUpdateMovieSettings = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (variable: UpdateMovieSettings) => MovieSettingsService.update(variable),
    onSuccess: async (data) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.MOVIES_SETTINGS] });

      queryClient.setQueryData<MovieSettings[]>(
        [QUERY_KEYS.MOVIES_SETTINGS], 
        (oldData) => {
          if (oldData) {
            return oldData.map((item) => {
              return item.id === data.id ? data : item;
            });
          }
          return oldData;
        });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { updateMovieSettings: mutateAsync, isLoading: isPending };
}
