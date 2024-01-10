class NotFoundMiddleware {
  static async handler(request, response) {
    return response.status(404).json({ error: 'Resource not found' });
  }
}

module.exports = { NotFoundMiddleware };
