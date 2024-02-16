import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router.js";
import { config as parseEnvironmentVariables } from "dotenv";
import { errorHandler } from "./common/middlewares/error-handler.js";
import connectToDB from "./common/config/mongodb.js";
import { jwtHandler } from "./common/config/passport/handlers.js";
import { setupPassport } from "./common/config/passport/index.js";

parseEnvironmentVariables();
connectToDB();
setupPassport({ jwtHandler });

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());

// Mount Router
app.use(router);

app.use("/", (req, res) => {
  res.send("Hello");
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1)); //Take down server
});
