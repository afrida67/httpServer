const http = require('http'); //supports both client & server options
const url = require('url'); //parsing urls

module.exports = http.createServer((req, res) => {

    let service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    //get request
    if (req.method === 'GET' && reqUrl.pathname === '/get'){

        console.log('Request: ' + req.method + 'Path: ' + reqUrl.pathname);
        service.getRequest(req, res);
    } 
    //post request
    else if (req.method === 'POST' && reqUrl.pathname === '/post'){

        console.log('Request: ' + req.method + 'Path: ' + reqUrl.pathname);
        service.postRequest(req, res);

    }
    else {

        console.log('Request: ' + req.method + 'Path: ' + reqUrl.pathname);
        service.invalidRequest(req, res); 
        
    }

});