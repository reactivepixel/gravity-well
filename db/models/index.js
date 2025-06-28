import { Sequelize } from "sequelize";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import config from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

const models = {};

// Import all models
const modelsDir = join(__dirname);
const modelFiles = await import("fs").then((fs) =>
  fs
    .readdirSync(modelsDir)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 &&
        file !== "index.js" &&
        file.slice(-3) === ".js"
    )
);

for (const file of modelFiles) {
  const model = await import(join(__dirname, file));
  const modelInstance = model.default.init(sequelize);
  models[modelInstance.name] = modelInstance;
}

// Run associations if they exist
Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

export { sequelize };
export default models;
