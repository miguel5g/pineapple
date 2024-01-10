require('dotenv/config');
const { app_factory } = require('./app');

const app = app_factory();
const PORT = process.env.PORT ?? 4000;

console.log('Iniciando servidor...');

app.listen(PORT, () => {
  console.log('Servidor ouvindo em http://localhost:%s/', PORT);
});
