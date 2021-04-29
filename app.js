//paquetes de node
require('dotenv').config();
//mis paquetes
const Server = require('./models/server');


const server = new Server();

server.listen();





