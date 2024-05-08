const PROXY_CONFIG = [
    {
      context: ["/api"],
      target: "https://localhost:7055",
      secure: false,
      logLevel: "debug",
      changeOrigin: true
    },
  ];
module.exports = PROXY_CONFIG;
