// config/config.js
import dotenv from "dotenv";

dotenv.config();

export default {
  development: {
    username: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "gravity",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      application_name: "gravity-well",
      statement_timeout:
        parseInt(process.env.POSTGRES_STATEMENT_TIMEOUT, 10) || 30000,
      idle_in_transaction_session_timeout:
        parseInt(
          process.env.POSTGRES_IDLE_IN_TRANSACTION_SESSION_TIMEOUT,
          10
        ) || 300000,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    username: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "gravity_test",
    host: process.env.DB_HOST || "postgres",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      application_name: "gravity-well",
      statement_timeout:
        parseInt(process.env.POSTGRES_STATEMENT_TIMEOUT, 10) || 30000,
      idle_in_transaction_session_timeout:
        parseInt(
          process.env.POSTGRES_IDLE_IN_TRANSACTION_SESSION_TIMEOUT,
          10
        ) || 300000,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
