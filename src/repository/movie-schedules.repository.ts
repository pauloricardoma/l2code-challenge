import { DatabaseType } from "../data/database";
import { CreateMovieSchedules, MovieSchedules, UpdateMovieSchedules } from "../types/movie-schedules.model";

class MovieSchedulesRepository {
  constructor(private db: DatabaseType) {}

  async list() {
    const movieSchedules = await this.db.getAllAsync<MovieSchedules>(`
      SELECT 
        id, 
        movie_id,
        movie_title,
        date,
        calendar_id,
        event_id
      FROM movies_schedules;
    `);
    return movieSchedules;
  }

  async create(movieSchedules: CreateMovieSchedules) {
    const result = await this.db.runAsync(`
      INSERT INTO movies_schedules 
        (movie_id, movie_title, date, calendar_id, event_id) 
      VALUES (?, ?, ?, ?, ?);
    `, [
      movieSchedules.movie_id, 
      movieSchedules.movie_title, 
      movieSchedules.date, 
      movieSchedules.calendar_id,
      movieSchedules.event_id
    ]);
    if (result.changes === 0) {
      throw new Error("Failed to create movie schedules");
    }
    const movieSchedulesCreated = await this.getById(result.lastInsertRowId);
    return movieSchedulesCreated;
  }

  async update(movieSchedules: UpdateMovieSchedules) {
    const result = await this.db.runAsync(`
      UPDATE movies_schedules 
      SET calendar_id = ? , event_id = ?, date = ? 
      WHERE id = ?;
    `, [
      movieSchedules.calendar_id, 
      movieSchedules.event_id, 
      movieSchedules.date, 
      movieSchedules.id
    ]);
    if (result.changes === 0) {
      throw new Error("Failed to update movie schedules");
    }
    const movieSettingsUpdated = await this.getById(result.lastInsertRowId);
    return movieSettingsUpdated;
  }

  async delete(id: number) {
    const result = await this.db.runAsync(`
      DELETE FROM movies_schedules WHERE id = ?;
    `, [id]);
    if (result.changes === 0) {
      throw new Error("Failed to delete movie schedules");
    }
  }

  async getById(id: number) {
    const result = await this.db.getFirstAsync<MovieSchedules>(`
      SELECT 
        id, 
        movie_id,
        movie_title,
        date,
        calendar_id,
        event_id
      FROM movies_schedules WHERE id = ?;
    `, [id]);
    if (!result) {
      return null;
    }
    return result;
  }

  async getByMovieId(id: number) {
    const result = await this.db.getFirstAsync<MovieSchedules>(`
      SELECT 
        id, 
        movie_id,
        movie_title,
        date,
        calendar_id,
        event_id
      FROM movies_schedules WHERE movie_id = ?;
    `, [id]);
    if (!result) {
      return null;
    }
    return result;
  }
}

export default MovieSchedulesRepository;
