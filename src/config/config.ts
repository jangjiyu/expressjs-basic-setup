import dotenv from "dotenv";

dotenv.config();

export default {
  development: {
    username: process.env.DATABASE_USERNAME_DEV as string,
    password: process.env.DATABASE_PASSWORD_DEV as string,
    database: process.env.DATABASE_NAME_DEV as string,
    host: process.env.DATABASE_HOST_DEV as string,
    dialect: "mysql" as const,
    // timezone: "+09:00",
    // pool: {
    //   max: 10,
    //   min: 0,
    // acquire: 30000,
    // idle: 10000
    //   acquire: 24000,
    //   idle: 8000,
  },
  test: {
    username: process.env.DATABASE_USERNAME_TEST as string,
    password: process.env.DATABASE_PASSWORD_TEST as string,
    database: process.env.DATABASE_NAME_TEST as string,
    host: process.env.DATABASE_HOST_TEST as string,
    dialect: "mysql" as const,
  },
  production: {
    username: process.env.DATABASE_USERNAME_PD as string,
    password: process.env.DATABASE_PASSWORD_PD as string,
    database: process.env.DATABASE_NAME__PD as string,
    host: process.env.DATABASE_HOST_PD as string,
    dialect: "mysql" as const,
    logging: false,
  },
};
