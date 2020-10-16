export = {
  appEnv: process.env.NODE_ENV || 'development',
  port: process.env.APP_PORT || 3000,
  log: {
    level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'development' ? 'debug' : 'info'),
    dir: process.env.LOG_DIR || 'logs'
  },
  database: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017',
    name: process.env.DATABASE_NAME || 'comment-svc',
  }
};