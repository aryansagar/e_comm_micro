import { createProxyMiddleware } from "http-proxy-middleware";

export const orderProxy = createProxyMiddleware({
  target: "http://localhost:4004",
  changeOrigin: true,
  pathRewrite: {
    "^/orders": "",
  },
});
