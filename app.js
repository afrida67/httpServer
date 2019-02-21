'use strict';

const http = require('http');
const mysql = require('mysql');
const url = require('url');
const fs = require('fs');

const port = 3000;

const server = http.createServer();

let config = {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "sys"
};

server.on('request', (req, res) => {

    const reqUrl = url.parse(req.url, true);

    let path = reqUrl.pathname;
    let name = reqUrl.query.name;
    let id = reqUrl.query.id;
    let grade = reqUrl.query.grade;
    let sql;
    let connection;

    switch (path) {

        /*** POST ***/
        case '/post':

            connection = mysql.createConnection(config);
            connection.connect(function(err) {
                if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.write(`Server failed to connect`);
                    res.end();
                } else {
                    sql = `INSERT INTO students (name, grade) VALUES ('${name}',${grade})`;
                    connection.query(sql, function(err, result) {
                        if (err) {
                            console.log(err);
                            res.writeHead(400);
                            res.write(`Bad request. Fill up all`);
                            res.end();
                        } else {
                            console.log(result);
                            console.log(`New Id Created: ${name} ${grade}`);
                            res.writeHead(200);
                            res.write(`New Student name : ${name} and grade : ${grade}`);
                            res.end();
                        }
                    });
                }
                connection.end();
            });
            break;

            /*** GET ***/
        case '/get':

            connection = mysql.createConnection(config);
            connection.connect(function(err) {
                if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.write(`Server failed to connect`);
                    res.end();
                } else {
                    sql = `Select * from students WHERE id= ${id}`;
                    connection.query(sql, function(err, result) {
                        if (err) {
                            console.log(err);
                            res.writeHead(400);
                            res.write(`Bad request`);
                            res.end();
                        } else {
                            if (!result.length) {
                                res.writeHead(404);
                                res.write(`Id doesn't exist, enter valid id`);
                                res.end();
                                console.log(`404 not found`);

                            } else {
                                let string = JSON.stringify(result);
                                let json = JSON.parse(string);
                                res.writeHead(200);
                                res.write(`Showing the student information : name: ${json[0].name}, grade : ${json[0].grade}`);
                                res.end();
                                console.log(`name: ${json[0].name}, grade : ${json[0].grade}`);
                            }
                        }
                    });
                }
                connection.end();
            });
            break;

            /*** DELETE ***/

        case '/delete':

            connection = mysql.createConnection(config);
            connection.connect(function(err) {
                if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.write(`Server failed to connect`);
                    res.end();
                } else {
                    sql = `Delete from students  WHERE id= ${id}`;
                    connection.query(sql, function(err, result) {
                        if (err) {
                            console.log(err);
                            res.writeHead(400);
                            res.write('Bad Request');
                            res.end();
                        } else {

                            if (result.affectedRows == 0) {
                                res.writeHead(404);
                                res.write(`Id doesn't exist, enter valid id`);
                                res.end();
                                console.log(`404 not found`);

                            } else {
                                res.writeHead(200);
                                res.write(`Deletion Successful`);
                                res.end();
                                console.log(`Deleted`);
                            }
                        }
                    });
                }
                connection.end();
            });

            break;

            /*** UPDATE ***/

        case '/update':

            connection = mysql.createConnection(config);
            connection.connect(function(err) {
                if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.write(`Server failed to connect`);
                    res.end();
                } else {
                    sql = `UPDATE students SET name= '${name}' WHERE id= ${id}`;

                    connection.query(sql, function(err, result) {
                        if (err) {
                            console.log(err);
                            res.writeHead(400);
                            res.write(`Bad Request`);
                            res.end();

                        } else {
                            if (result.affectedRows == 0) {
                                res.writeHead(404);
                                res.write(`Id doesn't exist, enter valid id`);
                                res.end();
                                console.log(`404 not found`);

                            } else {
                                console.log(result);
                                res.writeHead(200);
                                res.write(`Updated name: ${name}`);
                                res.end();
                            }
                        }
                    });
                }
                connection.end();
            });
            break;

        default:

            fs.readFile('index.html', function(err, data) {
                if (err) {
                    res.writeHead(404);
                    res.write(`File not found`);
                    res.end();
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write(data.toString());
                    res.end();
                }
            });
    }

});

// Start server
server.listen(port, () => console.log(`Server listening on port ${port}`));