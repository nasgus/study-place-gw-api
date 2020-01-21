const server = require('http').Server();
const io = require('socket.io')(server);

module.exports = io;