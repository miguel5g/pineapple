const { decode } = require('../libs/token');

class ProtectedRouteMiddleware {
  static async handler(request, response, next) {
    const { token } = request.cookies;

    if (!token) {
      return response.status(401).json({ error: 'Unauthenticated' });
    }

    try {
      const payload = decode(token);

      request.user = payload;

      return next();
    } catch (error) {
      if (error.message === 'jwt expired') {
        return response.status(401).json({ error: 'Session expired' });
      }

      if (error.message === 'jwt malformed') {
        return response.status(401).json({ error: 'Invalid session' });
      }

      if (error.message === 'invalid signature') {
        return response.status(401).json({ error: 'Invalid session' });
      }

      throw error;
    }
  }
}

module.exports = {
  ProtectedRouteMiddleware,
};
