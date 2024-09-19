/** Handle enviroment variables from a safe place after bootstraping the application */
import { config } from "dotenv";
config();

class Enviroment {
  private getItem(item: string): string | number | undefined {
    return process.env[item];
  }

  public getNodeEnv() {
    return this.getItem("NODE_ENV");
  }

  public getAppPort() {
    return this.getItem("PORT");
  }

  public getDatabaseConnection() {
    return this.getItem("DATABASE_CONNECTION");
  }
}

export default new Enviroment();
