import * as SQLite from 'expo-sqlite';

export type DatabaseType = SQLite.SQLiteDatabase;
export type AsyncDatabaseType = Promise<SQLite.SQLiteDatabase>;

export class Database {
  db: AsyncDatabaseType; 

  constructor() {
    this.db = SQLite.openDatabaseAsync('l2code');
    this.init()
  }

  private async init() {
    try {
      console.debug('init database');
      const dbRef = await this.db;
      await dbRef.execAsync(`
        CREATE TABLE IF NOT EXISTS movies_settings (
          id INTEGER PRIMARY KEY NOT NULL, 
          movie_id INTEGER NOT NULL,
          watched BOOLEAN NOT NULL, 
          is_wish BOOLEAN NOT NULL, 
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS movies_schedules (
          id INTEGER PRIMARY KEY NOT NULL, 
          movie_id INTEGER NOT NULL,
          movie_title TEXT NOT NULL,
          date DATETIME NOT NULL,
          event_id TEXT,
          calendar_id TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
    } catch (error) {
      console.error(error);
    }
  }

  async getDatabase(): AsyncDatabaseType {
    return await this.db;
  }
}

const instance = new Database();
export default instance;
