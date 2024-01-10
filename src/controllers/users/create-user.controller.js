const { z } = require('zod');

const { CreateUserService } = require('../../services/users/create-user.service');

const user_schema = z.object({
  display: z.string().min(1).max(64),
  username: z
    .string()
    .regex(/^[a-z0-9_]{4,64}$/i)
    .min(4)
    .max(64)
    .transform((value) => value.toLowerCase()),
  email: z.string().email().min(1).max(92),
  password: z.string().min(8).max(64),
});

class CreateUserController {
  static async handler(request, response) {
    const { display, email, password, username } = user_schema.parse(request.body);

    try {
      const id = await CreateUserService.handler({ display, email, password, username });

      return response.status(201).json({ id });
    } catch (error) {
      if (error.message === 'Username already exists') {
        return response.status(409).json({ error: error.message });
      }

      if (error.message === 'Email already exists') {
        return response.status(409).json({ error: error.message });
      }

      throw error;
    }
  }
}

module.exports = {
  CreateUserController,
};
