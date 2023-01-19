const http = require('http');
const port = process.env.PORT || 3000; // Cacher le port
const app = require('./app');
const logger = require("./logger");

const server = http.createServer(app);

server.listen(port);

logger.info("Server Listening On Port 3000");

console.log('Server created');
console.log('Listen on port ', port);