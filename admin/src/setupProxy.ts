import { createProxyMiddleware } from "http-proxy-middleware";
module.exports = function (app: any) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "localhost:6969/api",
      changeOrigin: true,
    })
  );
};
