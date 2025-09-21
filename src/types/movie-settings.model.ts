export interface MovieSettings {
  id: number;
  movie_id: number;
  watched: boolean;
  is_wish: boolean;
}

export interface CreateMovieSettings {
  movie_id: number;
  watched: boolean;
  is_wish: boolean;
}

export interface UpdateMovieSettings {
  id: number;
  watched: boolean;
  is_wish: boolean;
}

export type MovieSettingsMap = Record<number, MovieSettings>;
