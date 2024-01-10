const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

function decode(token) {
  return jwt.verify(token, SECRET);
}

function encode(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '1d', algorithm: 'HS256' });
}

module.exports = {
  decode,
  encode,
};
