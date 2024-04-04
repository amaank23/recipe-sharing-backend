import "reflect-metadata";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swagger/config";
import { myDataSource } from "./app-data-source";
import UserRouter from "./routes/users";
import PostRouter from "./routes/posts";
import CommentsRouter from "./routes/comments";
import "dotenv/config";

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/users", UserRouter);
app.use("/comments", CommentsRouter);
app.use("/posts", PostRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
