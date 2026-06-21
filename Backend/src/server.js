require('dotenv').config();

const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const { socketCorsOptions } = require('./config/cors');
const app = require('./app');
const initSocket = require('./socket/socket');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);

  const io = new Server(server, { cors: socketCorsOptions });

  initSocket(io);

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\nPort ${PORT} is already in use.`);
      console.error('Fix: close the other server, or run in PowerShell:');
      console.error(`  Get-NetTCPConnection -LocalPort ${PORT} | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }`);
      console.error('Or set a different PORT in Backend/.env\n');
      process.exit(1);
    }
    throw err;
  });

  server.listen(PORT, () => {
    console.log(`FoundLink API running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
