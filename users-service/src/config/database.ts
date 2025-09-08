import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    "store_db",      // BD_name
    "admin",         // user en docker
    "admin123",         // password en docker
    {
        host: "localhost",
        dialect: 'mysql',
        port: 3306,         // Puerto expuesto en docker-compose
        logging: false,     // Desactiva logs de SQL en consola
    });

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida con MySQL.");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
}