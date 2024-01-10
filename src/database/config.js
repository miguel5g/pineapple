const path = require('node:path');

const config = {
  development: {
    client: 'pg',
    // debug: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'migrations',
      directory: path.join(__dirname, 'migrations'),
      // stub: path.join(__dirname, 'migration.stub'),
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
      // stub: path.join(__dirname, 'seed.stub'),
      timestampFilenamePrefix: false,
    },
  },

  staging: {
    client: 'pg',
    debug: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'migrations',
      directory: path.join(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      directory: path.join(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
  },
};

module.exports = { config };
