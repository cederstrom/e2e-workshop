import path from "path";
import jsonfile from "jsonfile";
import Logger from "jet-logger";

interface IDatabase {
  days: Record<string, any>[];
}

export class BaseFileBasedRepository {
  private readonly dbFilePath = path.join(
    __dirname,
    `_storage`,
    process.env.STORAGE_FILE || "dev-storage.json"
  );

  constructor() {
    Logger.info(`Storing data in ${this.dbFilePath}`);
    try {
      jsonfile.readFileSync(this.dbFilePath);
    } catch {
      // If file does not exist
      this.clearDatabase();
    }
  }

  protected openDb(): Promise<IDatabase> {
    return jsonfile.readFile(this.dbFilePath) as Promise<IDatabase>;
  }

  protected saveDb(db: IDatabase): Promise<void> {
    return jsonfile.writeFile(this.dbFilePath, db);
  }

  clearDatabase(): void {
    jsonfile.writeFile(this.dbFilePath, {});
  }
}
