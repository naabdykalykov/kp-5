export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;
  
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
  
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    const statusColor = statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    
    console.log(
      `[${timestamp}] ${method} ${url} - ${statusColor}${statusCode}\x1b[0m - ${duration}ms`
    );
  });
  
  next();
};

export const validateBody = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Тело запроса не может быть пустым'
      });
    }
  }
  next();
};

