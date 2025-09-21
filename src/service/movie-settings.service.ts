import database from "../data/database";
import MovieSettingsRepository from "../repository/movie-settings.repository";
import { CreateMovieSettings, UpdateMovieSettings } from "../types/movie-settings.model";

export class MovieSettingsService {
  static async list() {
    const db = await database.getDatabase();
    const clientRepository = new MovieSettingsRepository(db);
    return clientRepository.list();
  }

  static async create(movieSettings: CreateMovieSettings) {
    try {
      const db = await database.getDatabase();
      const movieSettingsRepository = new MovieSettingsRepository(db);
      const existingClient = await movieSettingsRepository.getByMovieId(movieSettings.movie_id);
      if (existingClient) {
        throw new Error('Movie settings already exists');
      }
      const newMovieSttings = await movieSettingsRepository.create(movieSettings);
      if (!newMovieSttings) {
        throw new Error('Failed to create movie settings');
      }
      return newMovieSttings;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create movie settings');
    }
  }

  static async update(movieSettings: UpdateMovieSettings) {
    try {
      const db = await database.getDatabase();
      const movieSettingsRepository = new MovieSettingsRepository(db);
      const existingClient = await movieSettingsRepository.getById(movieSettings.id);
      if (!existingClient) {
        throw new Error('Movie settings not found');
      }
      const updateMovieSettings = await movieSettingsRepository.update(movieSettings);
      if (!updateMovieSettings) {
        throw new Error('Failed to update movie settings');
      }
      return updateMovieSettings;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update movie settings');
    }
  }
}