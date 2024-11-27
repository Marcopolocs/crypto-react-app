const PROXY_CONFIG = {
  '/v2/cryptocurrency/quotes/*': {
    target: 'https://pro-api.coinmarketcap.com',
    secure: true,
    loglevel: 'debug',
    changeOrigin: true,
  },
};

module.exports = PROXY_CONFIG;
