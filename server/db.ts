import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
    database: process.env.DB_NAME || 'shop-dev',
    dialect: 'postgres',
    username: process.env.DB_USER || "twils",
    password: process.env.DB_PASSWORD || "twils",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    models: [__dirname + '/models']
  });