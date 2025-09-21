import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { QUERY_KEYS } from "../constants/query-keys";
import { queryClient } from "../context/query-client.context";
import { MovieSchedulesService } from "../service/movie-schedules.service";
import {
  CreateMovieSchedules,
  MovieSchedules,
  MovieSchedulesMap,
  UpdateMovieSchedules
} from "../types/movie-schedules.model";

export const useQueryMoviesSchedules = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.MOVIES_SCHEDULES],
    queryFn: () => MovieSchedulesService.list(),
  });

  const schedulesData = useMemo(() => {
    const map = {} as MovieSchedulesMap;
    if (data) {
      for (const item of data) {
        if (!(item.movie_id in map)) {
          map[item.movie_id] = item;
        }
      }
    }
    return { data: data ?? [], map };
  }, [data]);

  return { data: schedulesData, isLoading };
}

export const useQueryMovieScheduleById = (id?: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.MOVIES_SCHEDULES, id],
    enabled: !!id,
    queryFn: () => MovieSchedulesService.get(id as number),
  });

  return { data, isLoading };
}

export const useQueryCreateMovieSchedules = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (variable: CreateMovieSchedules) => {
      return MovieSchedulesService.create(variable);
    },
    onSuccess: async (data) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.MOVIES_SCHEDULES] });

      queryClient.setQueryData<MovieSchedules[]>(
        [QUERY_KEYS.MOVIES_SCHEDULES], 
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

  return { createMovieSchedules: mutateAsync, isLoading: isPending };
}

export const useQueryUpdateMovieSchedules = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (variable: UpdateMovieSchedules) => {
      return MovieSchedulesService.update(variable);
    },
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: [QUERY_KEYS.MOVIES_SCHEDULES] }),
        queryClient.cancelQueries({ queryKey: [QUERY_KEYS.MOVIES_SCHEDULES, data.id] }),
      ]);
      
      queryClient.setQueryData<MovieSchedules[]>(
        [QUERY_KEYS.MOVIES_SCHEDULES], 
        (oldData) => {
          if (oldData) {
            return oldData.map((item) => {
              return item.id === data.id ? data : item;
            });
          }
          return oldData;
        }
      );
      queryClient.setQueryData<MovieSchedules>(
        [QUERY_KEYS.MOVIES_SCHEDULES, data.id], 
        (oldData) => {
          if (oldData) {
            return data;
          }
          return oldData;
        }
      );
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { updateMovieSchedules: mutateAsync, isLoading: isPending };
}

export const useQueryDeleteMovieSchedules = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (variable: number) => {
      return MovieSchedulesService.delete(variable);
    },
    onSuccess: async (_data, variable) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: [QUERY_KEYS.MOVIES_SCHEDULES] }),
        queryClient.cancelQueries({ queryKey: [QUERY_KEYS.MOVIES_SCHEDULES, variable] }),
      ]);
      
      queryClient.setQueryData<MovieSchedules[]>(
        [QUERY_KEYS.MOVIES_SCHEDULES], 
        (oldData) => {
          if (oldData) {
            return oldData.filter((item) => {
              return item.id !== variable;
            });
          }
          return oldData;
        }
      );
      queryClient.resetQueries({ 
        queryKey: [QUERY_KEYS.MOVIES_SCHEDULES, variable],
        exact: true,
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { deleteMovieSchedules: mutateAsync, isLoading: isPending };
}
