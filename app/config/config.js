export const MOGODB_CONNECTION =
  "mongodb+srv://Re_ShisTo7053R:#CP77#7053R#@novelty1.kr5q6zv.mongodb.net/?appName=Novelty1";
export const JWT_SECRET = "#CP77#7053R#";
export const JWT_EXPIRES_IN = 60 * 60 * 24 * 30; // 30days

export const EMAIL_HOST = "smtp.gmail.com";
export const EMAIL_PORT = 587;
export const EMAIL_USER = "anil7053r@gmail.com";
export const EMAIL_PASS = "CP77#7053R#";

export const MAX_JSON_SIZE = "50mb";
export const MAX_JSON_SIZE = true;

export const REQUEST_LIMIT_TIMEOUT = 15 * 60 * 1000; // 15 minutes
export const REQUEST_LIMIT_NUMBER = 3000; // 3000 requests per 15 minutes

export const WEB_CACHE = false; // Alaways set the framwork cache to false in case of expressjs applicarions.
export const PORT = 3000;

export const OTP_EXPIRES_IN = 10 * 60 * 1000; // 5 minutes
export const LOG_LEVEL = "info";
export const LOG_FILE_PATH = "logs/application.log";

export const CORS_ORIGIN = "*";
export const CORS_METHODS = "GET,POST,PUT,DELETE";
export const CORS_HEADERS = "Content-Type,Authorization";

export const RABBITMQ_URL = "amqp://guest:guest@localhost:5672";
export const RABBITMQ_QUEUE_EMAIL = "email.send"; // let we will use ut for email  sending

export const IMAGE_UPLOAD_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
export const IMAGE_STORAGE_SUBPATH = "app/storage/images";
