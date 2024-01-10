const knex = require('knex');
const { types } = require('pg');
const { builtins } = require('pg-types');
const { config } = require('../database/config');

const utc_with_ms_extended = /^(.{4})-(.{2})-(.{2})\s(.{2}):(.{2}):(.{2})\.(.{4,6})$/;
const utc_with_ms = /^(.{4})-(.{2})-(.{2})\s(.{2}):(.{2}):(.{2})\.(.{0,3})$/;
const utc = /^(.{4})-(.{2})-(.{2})\s(.{2}):(.{2}):(.{2})$/;

function parseTimestamp(value) {
  if (value === null) return null;

  if (utc_with_ms_extended.test(value)) {
    return new Date(value);
  }

  if (utc_with_ms.test(value)) {
    return new Date(value.replace(utc_with_ms, '$1-$2-$3T$4:$5:$6.$7'.padEnd(23, '0')) + 'Z');
  }

  if (utc.test(value)) {
    return new Date(value.replace(utc, '$1-$2-$3T$4:$5:$6.000Z'));
  }

  console.error('Invalid value', value);

  return value;
}

types.setTypeParser(builtins.TIMESTAMP, parseTimestamp);

const connection = knex(config[process.env.NODE_ENV ?? 'development']);

module.exports = {
  connection,
};
