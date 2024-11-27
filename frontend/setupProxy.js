const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/v2/cryptocurrency/quotes/latest',
    createProxyMiddleware({
      target: 'https://pro-api.coinmarketcap.com/',
      changeOrigin: true,
    })
  );
};
