const hostname = '127.0.0.1';
const port = 3000;

const server = require('./controller.js');

server.listen(port, hostname, () => {
    console.log(`Server running on port :${port} and host: http://${hostname}`);
})