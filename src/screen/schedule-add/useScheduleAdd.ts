import { useCalendar } from "@/src/hooks/useCalendar";
import {
  useQueryCreateMovieSchedules,
  useQueryMovieScheduleById,
  useQueryUpdateMovieSchedules,
} from "@/src/hooks/useQueryMoviesSchedules";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

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
  const [androidDate, setAndroidDate] = useState<Date>(new Date());
  const [androidTime, setAndroidTime] = useState<Date>(new Date());

  const openAndroidPicker = (mode: 'date' | 'time') => {
    if (mode === 'date') {
      DateTimePickerAndroid.open({
        mode: 'date',
        value: androidDate,
        negativeButton: {
          label: 'Voltar',
        },
        positiveButton: {
          label: 'Salvar',
        },
        onChange: (_event, selectedDate) => {
          setAndroidDate(selectedDate || new Date());
        },
        onTouchCancel: dismissAndroidPicker,
      })
    } else {
      DateTimePickerAndroid.open({
        mode: 'time',
        value: androidTime,
        negativeButton: {
          label: 'Voltar',
        },
        positiveButton: {
          label: 'Salvar',
        },
        onChange: (_event, selectedDate) => {
          setAndroidTime(selectedDate || new Date());
        },
        onTouchCancel: dismissAndroidPicker,
      })
    }
  }
  
  const dismissAndroidPicker = () => {
    DateTimePickerAndroid.dismiss('date')
    DateTimePickerAndroid.dismiss('time')
  }

  const goBack = () => {
    router.back();
  }

  const handleCreateSchedule = async () => {
    if (isChecked && !calendarId) {
      setShowCalendarModal(true);
      return;
    }

    let currentDate = date;
    if (Platform.OS === 'android') {
      const hour = androidTime.getHours();
      const minute = androidTime.getMinutes();
      const second = androidTime.getSeconds();
      currentDate = new Date(androidDate.setHours(hour, minute, second));
    }

    let eventId = schedule?.event_id || null;
    if (isChecked && calendarId) {
      if (eventId) {
        eventId = await updateEvent({
          id: eventId,
          calendarId: calendarId,
          date: currentDate,
        });
      } else {
        eventId = await createEvent({
          calendarId,
          title: `Assistir ${movieTitle}`,
          date: currentDate,
        });
      }
    }

    if (schedule?.id) {
      updateMovieSchedules({
        id: Number(schedule.id),
        date: currentDate.toISOString(),
        event_id: eventId,
        calendar_id: calendarId || null,
      });
    } else {
      createMovieSchedules({
        movie_id: Number(movieId),
        movie_title: movieTitle as string,
        date: currentDate.toISOString(),
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
        setAndroidDate(new Date(schedule.date));
        setAndroidTime(new Date(schedule.date));
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
    androidDate,
    androidTime,
    goBack,
    handleCreateSchedule,
    setShowDateModal,
    setShowCalendarModal,
    setDate,
    setIsChecked,
    setCalendarId,
    openAndroidPicker,
  };
}

export default useScheduleAdd;
