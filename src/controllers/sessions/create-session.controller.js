const { z } = require('zod');
const { CreateSessionService } = require('../../services/sessions/create-session.service');

const session_schema = z.object({
  username: z.string().min(4).max(64),
  password: z.string().min(8).max(64),
});

class CreateSessionController {
  static async handler(request, response) {
    const { password, username } = session_schema.parse(request.body);

    try {
      const token = await CreateSessionService.handler({
        password,
        username,
      });

      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 1);

      return response
        .status(201)
        .cookie('token', token, {
          path: '/',
          expires,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined,
        })
        .json({ message: 'Session created', expires });
    } catch (error) {
      if (error.message === 'Wrong password') {
        return response.status(401).json({ error: error.message });
      }

      if (error.message === 'User not found') {
        return response.status(404).json({ error: error.message });
      }

      throw error;
    }
  }
}

module.exports = {
  CreateSessionController,
};
