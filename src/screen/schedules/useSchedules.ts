import { useCalendar } from "@/src/hooks/useCalendar";
import {
  useQueryDeleteMovieSchedules,
  useQueryMoviesSchedules
} from "@/src/hooks/useQueryMoviesSchedules";
import { MovieSchedules } from "@/src/types/movie-schedules.model";
import { useMemo, useState } from "react";
import { Alert } from "react-native";

const useSchedules = () => {
  const { data: schedulesData, isLoading } = useQueryMoviesSchedules();
  const { deleteMovieSchedules } = useQueryDeleteMovieSchedules();
  const { deleteEvent } = useCalendar();

  const [search, setSearch] = useState<string>('');

  const filteredSchedules = useMemo(() => {
    if (search && schedulesData.data.length > 0) {
      return schedulesData.data.filter((schedule) => {
        return schedule.movie_title.toLowerCase().includes(search.toLowerCase());
      });
    }
    return schedulesData.data;
  }, [schedulesData.data, search]);

  const askToDeleteMovieSchedules = async (item: MovieSchedules) => {
    Alert.alert(
      'Deletar agendamento',
      `Tem certeza que deseja deletar o agendamento do filme ˜${item.movie_title}˜?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Deletar', onPress: () => handleDeleteMovieSchedules(item) },
      ]
    );
  }

  const handleDeleteMovieSchedules = async (item: MovieSchedules) => {
    try {
      await deleteMovieSchedules(item.id);
      if (item?.event_id) {
        await deleteEvent(item.event_id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return { 
    search,
    isLoading,
    filteredSchedules,
    setSearch,
    askToDeleteMovieSchedules,
  };
}

export default useSchedules;
