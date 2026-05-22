### Procedures:

1. ##### Initiate npm

```bash
npm init --y
```

2. ##### Created a new file names index.js or app.js
3. ##### Install intial necessary packages:

- `cors`
  A middleware that manages Cross-Origin Resource Sharing, allowing or restricting web apps on other domains from making requests to your API.

- `bcryptjs`
  A security library used to securely hash and salt user passwords before storing them in a database, making leaked data useless to hackers.

- `amqplib`
  The official Node.js client for RabbitMQ, used to handle asynchronous message queuing, background jobs, and microservice communication.

- `express`
  A minimal web framework for Node.js used to build robust APIs, manage routing, and handle HTTP requests/responses smoothly.

- `express-fileupload`
  A simple middleware that handles multipart/form-data requests, making it easy to upload files and images from the client side.

- `express-rate-limit`
  A security middleware used to limit repeated requests to public APIs, effectively protecting your app against brute-force and DDoS attacks.

- `express-validator`
  A set of express middlewares that wraps the validator.js library, used to clean, sanitize, and validate incoming user request data.

- `helmet`
  A security package that automatically sets various HTTP headers to shield your Express application from common web vulnerabilities.

- `hpp`
  An acronym for "HTTP Parameter Pollution," this middleware protects your app from malicious query string attacks that try to crash your server.

- `jsonwebtoken`
  An implementation of JSON Web Tokens (JWT) used to securely transmit user identity payload data for stateless authentication and authorization.

- `nodemailer`
  A library that allows Node.js applications to easily compose and send emails using SMTP servers or cloud services.

- `mongoose`
  An Object Data Modeling (ODM) library for MongoDB that provides a schema-based solution to model, validate, and query your application data.

- `pino`
  An ultra-low overhead, highly efficient Node.js logger used to output structured JSON logs without sacrificing server performance.

```bash
npm install cors
npm install bcryptjs
npm install amqplib
npm install express
npm install express-fileupload
npm install express-rate-limit
npm install express-validator
npm install helmet
npm install hpp
npm install jsonwebtoken
npm install nodemailer
npm install mongoose
npm install pino
```

4. ##### File folder structure

5. ##### config.js file requires:

- MOGODB_CONNECTION
- JWT_SECRET
- JWT_EXPIRES_IN
- EMAIL_HOST
- EMAIL_PORT
- EMAIL_USER
- EMAIL_PASS
- MAX_JSON_SIZE
- MAX_JSON_SIZE
- REQUEST_LIMIT_TIMEOUT
- WEB_CACHE
- PORT
- OTP_EXPIRES_IN
- LOG_LEVEL
- LOG_FILE_PATH
- RABBITMQ_URL
- RABBITMQ_QUEUE_EMAIL
- IMAGE_UPLOAD_SIZE_LIMIT
- IMAGE_STORAGE_SUBPATH

5. ##### Initial Configuration of Route file as `api.js`

```js
import express from "express";
const router = express.Router();
export default router;
```

6. ##### Initial Configuration of `app.js`.

- Import packges previously installed:

```js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/api.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLPath } from "url";
```

- Import Constants from `config.s`

```js
import {
  IMAGE_UPLOAD_SIZE_LIMIT,
  IMAGE_STORAGE_SUBPATH,
  MONGODB_CONNECTION,
  MAX_JSON_SIZE,
  PORT,
  REQUEST_LIMIT_NUMBER,
  REQUEST_LIMIT_TIMEOUT,
  WEB_CACHE,
  URL_ENCODED,
  MAX_JSON_SIZE,
} from "./app/config/config.js";
```

- Initialize express as the core where all the middleware and routes ar attached to.

```js
const app = express();
```

- Attach your middlewares:

```js
// Middlewares
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
app.set("etag", WEB_CACHE);
```

- Set up connection logic with Database:

```js
// Database Connection
// set autoindex for indexing in a database
mongoose
  .connect(MOGODB_CONNECTION, { autoIndex: true })
  .then(() => {
    console.log("Database Connection Success");
  })
  .catch((err) => {
    console.log("Database Connection Error", err);
  });

// Set the root directory path for any file to U/D
const __rootDir = path.dirname(fileURLPath(import.meta.url));
app.use(
  "/storage-files",
  express.static(path.join(__rootDir, IMAGE_STORAGE_SUBPATH)),
);
```

- set up Router:

```js
app.use("/api", router);

// For 404 error
app.use((req, res) => {
  res.json({
    msg: "404 not found",
  });
});
```

- Configure Cluster conditions for eventloop after importing the cluster and :

```js
import cluster from "cluster";

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
```
