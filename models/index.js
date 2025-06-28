const { Sequelize } = require("sequelize");
const Node = require("./node");
const Node_relation = require("./node_relation");

const env = process.env.NODE_ENV || "development";
const config = {
  host: process.env.DB_HOST || "postgres",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "gravity",
  username: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "password",
  dialect: "postgres",
  logging: env === "development" ? console.log : false,
  define: {
    underscored: true,
  },
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    define: config.define,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Initialize models
const models = {
  node: Node.init(sequelize),
  node_relation: Node_relation.init(sequelize),
};

// Run associations
Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

module.exports = {
  sequelize,
  Sequelize,
  ...models,
};
