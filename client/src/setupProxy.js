/**
 * @file Set ups proxy for dev development using create-react-app's http-proxy-middleware. Routes dev to localhost:8080
 * @author Kevin Xu
 */
const { createProxyMiddleware } = require('http-proxy-middleware');
/**
 * The manual proxies that the react-app uses
 *
 * @param {*} app the react-app
 */
module.exports = function (app) {
  app.use(
    ['/api', 'auth/google'],
    createProxyMiddleware({
      target: process.env.REACT_APP_PUBLIC_SERVER_DEV_URL,
      changeOrigin: true,
    }),
  );
};
