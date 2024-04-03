import { DataSource } from "typeorm";
import dotenv from "dotenv";
import User from "./entities/User";

dotenv.config();
export const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  logging: true,
  synchronize: false,
  migrations: ["src/migrations/*{.ts,.js}"],
  migrationsTableName: "migrations",
});
