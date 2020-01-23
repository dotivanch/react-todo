const   express = require('express'),
        bodyParser = require('body-parser');
const   cors = require('./cors.js');
const   path = require('path');

const   port = process.env.PORT || 3333;

const server = express();
server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());
server.use(cors);

server.use(express.static(path.join(__dirname, 'client/build')));

server.listen(port, () => {
    console.log(`API running @ http://localhost:${port}`);
});

module.exports = server