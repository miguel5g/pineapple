const { createId } = require('@paralleldrive/cuid2');

const { hash_text } = require('../../libs/encryption');
const { connection } = require('../../libs/connection');

class CreateUserService {
  static async handler({ display, username, email, password }) {
    const data = {
      id: createId(),
      display,
      username,
      email,
      password: await hash_text(password),
    };

    try {
      await connection('users').insert(data);

      // TODO: Enviar e-mail de boas-vindas

      return data.id;
    } catch (error) {
      if (error.code === '23505') {
        if (error.constraint === 'users_username_unique') {
          throw new Error('Username already exists');
        }

        if (error.constraint === 'users_email_unique') {
          throw new Error('Email already exists');
        }
      }

      throw error;
    }
  }
}

module.exports = {
  CreateUserService,
};
