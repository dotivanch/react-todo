const server = require('./server.js')
require('./database');
require('./routes')(server);

module.exports = server