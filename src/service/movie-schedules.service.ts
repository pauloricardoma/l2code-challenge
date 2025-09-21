import database from "../data/database";
import MovieSchedulesRepository from "../repository/movie-schedules.repository";
import { CreateMovieSchedules, UpdateMovieSchedules } from "../types/movie-schedules.model";

export class MovieSchedulesService {
  static async list() {
    try {
      const db = await database.getDatabase();
      const movieSchedulesRepository = new MovieSchedulesRepository(db);
      return movieSchedulesRepository.list();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to list movie schedules');
    }
  }

  static async get(id: number) {
    try {
      const db = await database.getDatabase();
      const movieSchedulesRepository = new MovieSchedulesRepository(db);
      return movieSchedulesRepository.getById(id);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get movie schedules');
    }
  }

  static async create(movieSchedules: CreateMovieSchedules) {
    try {
      const db = await database.getDatabase();
      const movieSchedulesRepository = new MovieSchedulesRepository(db);
      const existingSchedule = await movieSchedulesRepository.getByMovieId(movieSchedules.movie_id);
      if (existingSchedule) {
        throw new Error('Movie schedules already exists');
      }
      const newSchedule = await movieSchedulesRepository.create(movieSchedules);
      if (!newSchedule) {
        throw new Error('Failed to create movie schedules');
      }
      return newSchedule;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create movie schedules');
    }
  }

  static async update(movieSchedules: UpdateMovieSchedules) {
    try {
      const db = await database.getDatabase();
      const movieSchedulesRepository = new MovieSchedulesRepository(db);
      const existingSchedule = await movieSchedulesRepository.getById(movieSchedules.id);
      if (!existingSchedule) {
        throw new Error('Movie settings not found');
      }
      const updateSchedule = await movieSchedulesRepository.update(movieSchedules);
      if (!updateSchedule) {
        throw new Error('Failed to update movie schedules');
      }
      return updateSchedule;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update movie schedules');
    }
  }

  static async delete(id: number) {
    try {
      const db = await database.getDatabase();
      const movieSchedulesRepository = new MovieSchedulesRepository(db);
      const existingSchedule = await movieSchedulesRepository.getById(id);
      if (!existingSchedule) {
        throw new Error('Movie schedules not found');
      }
      await movieSchedulesRepository.delete(id);
      return true;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete movie schedules');
    }
  }
}