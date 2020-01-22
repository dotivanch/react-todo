const   express = require('express'),
        bodyParser = require('body-parser');
const   cors = require('./cors.js');
const   path = require('path');

const server = express();
server.use(express.static(path.join(__dirname, 'client/build')));
server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());
server.use(cors);

server.listen(3333, () => {
    console.log('API running @ http://localhost:3333')
})

module.exports = server