import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/api.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import cluster from "cluster";

import {
  IMAGE_UPLOAD_SIZE_LIMIT,
  IMAGE_STORAGE_SUBPATH,
  MAX_JSON_SIZE,
  PORT,
  REQUEST_LIMIT_NUMBER,
  REQUEST_LIMIT_TIMEOUT,
  WEB_CACHE,
  URL_ENCODED,
} from "./app/config/config.js";
import { log } from "console";

// Initialize Express application
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(
  fileUpload({
    limit: { fileSize: IMAGE_UPLOAD_SIZE_LIMIT },
    abortOnLimit: true,
    useTempFiles: false,
  }),
);

app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODED }));

const limiter = rateLimit({
  windowMs: REQUEST_LIMIT_TIMEOUT,
  max: REQUEST_LIMIT_NUMBER,
});
app.use(limiter);
app.set("etag", WEB_CACHE); // set the caches in etag

// Database Connection
// set autoindex for indexing in a database
mongoose
  .connect(process.env.MONGO_URL, { autoIndex: true }) //create a .env file and add your mongo url as MONGO_URL = your_mongo_url
  .then(() => {
    console.log("Database Connection Success");
  })
  .catch((err) => {
    console.log("Database Connection Error", err);
  });

// Set the root directory path for any file to U/D
const __rootDir = path.dirname(fileURLToPath(import.meta.url));
app.use(
  "/storage-files",
  express.static(path.join(__rootDir, IMAGE_STORAGE_SUBPATH)),
); // Serve static files from storage directory at /storage-files route

// Route

app.use("/api", router);

// For 404 error
app.use((req, res) => {
  res.json({
    msg: "404 not found",
  });
});

// Cluster Configuration
if (cluster.isPrimary) {
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  app.listen(PORT, () => {
    console.log(`Process ${process.pid} Running`);
  });
}
