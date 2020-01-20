const   express = require('express'),
        bodyParser = require('body-parser');
const   cors = require('./cors.js');

const server = express();
server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());
server.use(cors);

server.listen(3333, () => {
    console.log('API running @ http://localhost:3333')
})

module.exports = server