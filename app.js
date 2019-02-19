'use strict';

const http = require('http');
const mysql = require('mysql');
const url = require('url'); 
const fs = require('fs');

const port = 3000;

const server = http.createServer();

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "sys"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log('Connected!');
    });

server.on('request', (req, res) => {

    const reqUrl = url.parse(req.url, true);

    let path = reqUrl.pathname ;
    let name = reqUrl.query.name;
    let id = reqUrl.query.id;
    let grade =  reqUrl.query.grade; 
    let sql;

    switch(path) {

    //*** POST ***/
        case '/post': 
  
            sql = `INSERT INTO students (name, grade) VALUES ('${name}',${grade})`;    
                                    
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                });

                res.end('Saved to Database'); 
                break;

        //*** GET ***/
        case '/get':
                    
            sql = `Select * from students WHERE id= ${id}`;

            con.query(sql, function (err, result) {
                if (err) throw err;

                if (!result.length){
                    console.log(`Id doesn't exist`);
                }
                else console.log(result);
                });

             res.end('Showing Student Information');   
             break;

        //*** DELETE ***//

        case '/delete':
                        
            sql = `Delete from students  WHERE id= ${id}`;  

            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                });

                res.end('Deletion Successful');  
                break;

        //*** UPDATE ***//

        case '/update':

            sql = `UPDATE students SET name= '${name}' WHERE id= ${id}`;   
    
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                });

                res.end('DB has been updated');  
                break;
  
        default:
        
            fs.readFile('index.html', function(err, data){
                if (err) {
                res.writeHead(404);
                res.write('File not found');
                res.end();
                }  else {
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