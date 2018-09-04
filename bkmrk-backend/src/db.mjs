import Sequelize from 'sequelize';

const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

// eslint-disable-next-line
export const sql = new Sequelize('postgres', user, password, {
  host: process.env.POSTGRES_HOST || 'postgres',
  port: process.env.POSTGRES_PORT || 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});
