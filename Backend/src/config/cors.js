const isDev = process.env.NODE_ENV !== 'production';

const configuredOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const isLocalhostOrigin = (origin) => /^https?:\/\/localhost:\d+$/.test(origin);

const corsOriginCheck = (origin, callback) => {
  if (!origin) {
    callback(null, true);
    return;
  }

  if (configuredOrigins.includes(origin)) {
    callback(null, true);
    return;
  }

  if (isDev && isLocalhostOrigin(origin)) {
    callback(null, true);
    return;
  }

  callback(new Error(`CORS blocked for origin: ${origin}`));
};

const corsOptions = {
  origin: corsOriginCheck,
  credentials: true,
};

const socketCorsOptions = {
  origin: corsOriginCheck,
  methods: ['GET', 'POST'],
  credentials: true,
};

module.exports = { corsOptions, socketCorsOptions };
