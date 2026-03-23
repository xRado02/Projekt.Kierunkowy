const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7209';

const PROXY_CONFIG = [
  {
    context: [
      "/api/order",
      "/api/Order/orderFilteredBy",
      "/api/order/delete",
      "/api/order/page",
      "/api/user",
      "/api/user/delete-multiple",
      "/api/Auth/login",
      "/api/Auth/activate",
      "/api/Auth/validate-reset-password-token",
      "/api/Auth/reset-password",
      "/api/Auth/refresh-token",
      "/api/emailsender/invite",
      "/api/emailsender/reset",
      "/api/accountdetails",
      "/api/message",
    ],
    target: target, 
    secure: false,
    changeOrigin: true
  }
];

module.exports = PROXY_CONFIG;

