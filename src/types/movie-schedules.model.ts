export interface MovieSchedules {
  id: number;
  movie_id: number;
  movie_title: string;
  date: string;
  event_id: string | null;
  calendar_id: string | null;
}

export interface CreateMovieSchedules {
  movie_id: number;
  movie_title: string;
  date: string;
  event_id: string | null;
  calendar_id: string | null;
}

export interface UpdateMovieSchedules {
  id: number;
  date: string;
  event_id: string | null;
  calendar_id: string | null;
}

export type MovieSchedulesMap = Record<number, MovieSchedules>;
