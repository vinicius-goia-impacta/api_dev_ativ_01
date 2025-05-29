function loggerMiddleware(req, res, next) {
  const start = Date.now();
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  
  // Interceptar o método original end() da resposta
  const originalEnd = res.end;
  res.end = function(...args) {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    originalEnd.apply(res, args);
  };

  next();
}

module.exports = loggerMiddleware;