require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME_DEV || "root",
    password: process.env.DATABASE_PASSWORD_DEV || null,
    database: process.env.DATABASE_NAME_DEV || "wanted_pre_onboarding_8",
    host: process.env.DATABASE_HOST_DEV || "127.0.0.1",
    dialect: "mysql",
    logging: false,
    // timezone: "+09:00",
    // pool: {
    //   max: 10,
    //   min: 0,
    // acquire: 30000,
    // idle: 10000
    //   acquire: 24000,
    //   idle: 8000,
    // },
  },
  test: {
    username: process.env.DATABASE_USERNAME_TEST || "root",
    password: process.env.DATABASE_PASSWORD_TEST || null,
    database: process.env.DATABASE_NAME_TEST || "database_test",
    host: process.env.DATABASE_HOST_TEST || "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_USERNAME_PD || "root",
    password: process.env.DATABASE_PASSWORD_PD || null,
    database: process.env.DATABASE_NAME__PD || "database_production",
    host: process.env.DATABASE_HOST_PD || "127.0.0.1",
    dialect: "mysql",
  },
};
