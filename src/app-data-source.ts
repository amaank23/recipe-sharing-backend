import { DataSource } from "typeorm";
require("dotenv").config();
export const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/entities/*.js"],
  logging: true,
  synchronize: true,
  migrations: ["src/migrations/*.js"],
  migrationsTableName: "migrations",
});
