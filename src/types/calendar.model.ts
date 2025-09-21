export interface CreateCalendarEvent {
  calendarId: string;
  title: string;
  date: Date;
}

export interface UpdateCalendarEvent {
  id: string;
  calendarId: string;
  date: Date;
}
