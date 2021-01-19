/* eslint-disable quote-props */
import env from './env';

module.exports = {
  production: {
    url: env.PRO_URL,
    dialect: 'postgres',
    ssl: true
  },

  development: {
    url: env.DATABASE_URL_DEV || env.LOCAL_URL,
    dialect: 'postgres',
    ssl: true
  },

  test: {
    url: env.DATABASE_URL_TEST || env.LOCAL_URL,
    dialect: 'postgres',
  },
};
