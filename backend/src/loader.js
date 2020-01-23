const   server  = require('./server.js');
const   path    = require('path');
require('./database');
require('./routes')(server);

server.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//module.exports = server