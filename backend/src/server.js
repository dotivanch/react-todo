const   express = require('express'),
        bodyParser = require('body-parser');
const   cors = require('./cors.js');
const   path = require('path');

const server = express();
server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());
server.use(cors);

const port = process.env.PORT || 3333;

server.listen(port, () => {
    console.log(`API running @ http://localhost:${port}`)
});


const staticFilesPath = path.join(__dirname, 'client/build');
server.use(express.static(staticFilesPath));
console.log('Expecting frontend to be in:', staticFilesPath);

module.exports = server