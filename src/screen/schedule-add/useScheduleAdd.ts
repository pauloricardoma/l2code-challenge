import { useCalendar } from "@/src/hooks/useCalendar";
import {
  useQueryCreateMovieSchedules,
  useQueryMovieScheduleById,
  useQueryUpdateMovieSchedules,
} from "@/src/hooks/useQueryMoviesSchedules";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";

const useScheduleAdd = () => {
  const router = useRouter();
  const { id, movieId, movieTitle } = useLocalSearchParams();
  const { data: schedule } = useQueryMovieScheduleById(id ? Number(id) : null);
  const { createMovieSchedules } = useQueryCreateMovieSchedules();
  const { updateMovieSchedules } = useQueryUpdateMovieSchedules();
  const { calendars, createEvent, updateEvent } = useCalendar();

  const firstRender = useRef(true);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [isChecked, setIsChecked] = useState(false);
  const [calendarId, setCalendarId] = useState<string>('');

  const goBack = () => {
    router.back();
  }

  const handleCreateSchedule = async () => {
    if (isChecked && !calendarId) {
      setShowCalendarModal(true);
      return;
    }
    let eventId = schedule?.event_id || null;
    if (isChecked && calendarId) {
      if (eventId) {
        eventId = await updateEvent({
          id: eventId,
          calendarId: calendarId,
          date: date,
        });
      } else {
        eventId = await createEvent({
          calendarId,
          title: `Assistir ${movieTitle}`,
          date: date,
        });
      }
    }
    if (schedule?.id) {
      updateMovieSchedules({
        id: Number(schedule.id),
        date: date.toISOString(),
        event_id: eventId,
        calendar_id: calendarId || null,
      });
    } else {
      createMovieSchedules({
        movie_id: Number(movieId),
        movie_title: movieTitle as string,
        date: date.toISOString(),
        event_id: eventId,
        calendar_id: calendarId || null,
      });
    }
    router.back();
  }

  useFocusEffect(
    useCallback(() => {
      if (schedule && firstRender.current) {
        setDate(new Date(schedule.date));
        setIsChecked(schedule.event_id ? true : false);
        setCalendarId('');
        firstRender.current = false;
      }

      return () => {
        setDate(new Date());
        setIsChecked(false);
        setCalendarId('');
        firstRender.current = true;
      }
    }, [schedule])
  );

  useEffect(() => {
    if (!isChecked) {
      setCalendarId('');
    }
  }, [isChecked]);
  
  return {
    id,
    movieTitle,
    calendars,
    showDateModal,
    showCalendarModal,
    date,
    isChecked,
    calendarId,
    goBack,
    handleCreateSchedule,
    setShowDateModal,
    setShowCalendarModal,
    setDate,
    setIsChecked,
    setCalendarId,
  };
}

export default useScheduleAdd;
