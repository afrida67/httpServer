const http = require('http');

//creating server object
http.createServer ((request, response) => {
    response.write('Check Response');
    response.end();
}).listen(3000, () => {
    console.log('Server start at port 3000');
});
