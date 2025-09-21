import { DatabaseType } from "../data/database";
import { CreateMovieSettings, MovieSettings, UpdateMovieSettings } from "../types/movie-settings.model";

class MovieSettingsRepository {
  constructor(private db: DatabaseType) {}

  async list() {
    const movieSettings = await this.db.getAllAsync<MovieSettings>(`
      SELECT 
        id, 
        movie_id,
        watched, 
        is_wish 
      FROM movies_settings;
    `);
    return movieSettings;
  }

  async create(movieSettings: CreateMovieSettings) {
    const result = await this.db.runAsync(`
      INSERT INTO movies_settings (movie_id, watched, is_wish) VALUES (?, ?, ?);
    `, [movieSettings.movie_id, movieSettings.watched, movieSettings.is_wish]);
    if (result.changes === 0) {
      throw new Error("Failed to create movie settings");
    }
    const movieSettingsCreated = await this.getById(result.lastInsertRowId);
    return movieSettingsCreated;
  }

  async update(movieSettings: UpdateMovieSettings) {
    const result = await this.db.runAsync(`
      UPDATE movies_settings SET watched = ?, is_wish = ? WHERE id = ?;
    `, [movieSettings.watched, movieSettings.is_wish, movieSettings.id]);
    if (result.changes === 0) {
      throw new Error("Failed to update movie settings");
    }
    const movieSettingsUpdated = await this.getById(result.lastInsertRowId);
    return movieSettingsUpdated;
  }

  async getById(id: number) {
    const result = await this.db.getFirstAsync<MovieSettings>(`
      SELECT 
        id, 
        movie_id,
        watched, 
        is_wish 
      FROM movies_settings WHERE id = ?;
    `, [id]);
    if (!result) {
      return null;
    }
    return result;
  }

  async getByMovieId(id: number) {
    const result = await this.db.getFirstAsync<MovieSettings>(`
      SELECT 
        id, 
        movie_id,
        watched, 
        is_wish 
      FROM movies_settings WHERE movie_id = ?;
    `, [id]);
    if (!result) {
      return null;
    }
    return result;
  }
}

export default MovieSettingsRepository;
