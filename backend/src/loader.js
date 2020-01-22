const   server  = require('./server.js');
const   path    = require('path');
require('./database');
require('./routes')(server);

//module.exports = server