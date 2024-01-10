const bcrypt = require('bcrypt');

const SALT_ROUNDS = +process.env.SALT_ROUNDS;

async function compare_text(hash, text) {
  return bcrypt.compare(text, hash);
}

async function hash_text(text) {
  return bcrypt.hash(text, SALT_ROUNDS);
}

module.exports = {
  compare_text,
  hash_text,
};
