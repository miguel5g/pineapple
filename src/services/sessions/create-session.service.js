const { connection } = require('../../libs/connection');
const { compare_text } = require('../../libs/encryption');
const { encode } = require('../../libs/token');

class CreateSessionService {
  static async handler({ username, password }) {
    const user = await connection('users').where({ username, deleted_at: null }).first();

    if (!user) {
      throw new Error('User not found');
    }

    const is_valid_password = await compare_text(user.password, password);

    if (!is_valid_password) {
      throw new Error('Wrong password');
    }

    return encode({ id: user.id });
  }
}

module.exports = {
  CreateSessionService,
};
