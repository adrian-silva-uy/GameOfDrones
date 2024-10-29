const PROXY_CONFIG = [
  {
    context: ["/api"],
    target: "http://localhost:5277",
    secure: false,
    changeOrigin: true, // Asegura que la solicitud se origine correctamente
    logLevel: "debug"
  }
];

module.exports = PROXY_CONFIG;

