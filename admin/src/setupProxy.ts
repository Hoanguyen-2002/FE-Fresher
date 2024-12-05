import { createProxyMiddleware } from "http-proxy-middleware";
module.exports = function (app: any) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "10.63.164.67:6969/api",
      changeOrigin: true,
    })
  );
};
