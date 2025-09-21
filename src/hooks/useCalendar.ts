import * as Calendar from 'expo-calendar';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { CreateCalendarEvent, UpdateCalendarEvent } from '../types/calendar.model';

export const useCalendar = () => {
  const [status, requestPermission] = Calendar.useCalendarPermissions();
  
  const [isLoading, setIsLoading] = useState(false);
  const [calendars, setCalendars] = useState<Calendar.Calendar[]>([]);

  const listCalendars = useCallback(async () => {
    try {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      if (calendars.length === 0) {
        Alert.alert('Nenhum calendário encontrado');
      }
      const validCalendars = calendars.filter((calendar) => calendar.allowsModifications);
      setCalendars(validCalendars);
    } catch (error) {
      console.error('Erro ao listar calendários:', error);
      setCalendars([]);
    }
  }, []);

  const createEvent = useCallback(async (event: CreateCalendarEvent) => {
    try {
      setIsLoading(true);
      const eventId = await Calendar.createEventAsync(
        event.calendarId,
        {
          title: event.title,
          startDate: event.date.toISOString(),
          endDate: new Date(event.date.getTime() + 1000 * 60 * 60 * 2).toISOString(),
          alarms: [
            { relativeOffset: -1000 * 60 * 15 },
            { relativeOffset: -1000 * 60 * 30 }
          ]
        }
      );
      return eventId;
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (event: UpdateCalendarEvent) => {
    try {
      setIsLoading(true);
      const eventId = await Calendar.updateEventAsync(
        event.id,
        {
          calendarId: event.calendarId,
          startDate: event.date.toISOString(),
          endDate: new Date(event.date.getTime() + 1000 * 60 * 60 * 2).toISOString(),
          alarms: [
            { relativeOffset: -1000 * 60 * 15 },
            { relativeOffset: -1000 * 60 * 30 }
          ]
        }
      );
      return eventId;
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (eventId: string) => {
    try {
      setIsLoading(true);
      await Calendar.deleteEventAsync(eventId);
      return true;
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!status?.granted) {
      requestPermission();
    }
    if (status?.granted) {
      listCalendars();
    }
  }, [status?.granted, requestPermission, listCalendars]);

  return {
    calendars,
    isLoading,
    hasPermission: status?.granted,
    requestPermission,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};
