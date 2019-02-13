const url = require('url');

exports.getRequest = (req, res) => {
    const reqUrl = url.parse(req.url, true);
    let name = 'World';

    if (reqUrl.query.name) {
        name = reqUrl.query.name;
    }

    let response = {
        "text": "Welcome " + name
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};

exports.postRequest = (req, res) => {

    body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {

        postBody = JSON.parse(body);

        let response = {
            "text": "Post request is " + postBody.value
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));

    });
};

exports.invalidRequest = (req, res) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};