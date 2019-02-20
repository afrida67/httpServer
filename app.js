'use strict';

const http = require('http');
const mysql = require('mysql');
const url = require('url'); 
const fs = require('fs');
const { parse } = require('querystring');

const port = 3000;

const server = http.createServer();

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "sys"
    });


server.on('request', (req, res) => {
    
    const reqUrl = url.parse(req.url, true);

    let path = reqUrl.pathname ;
    let name = reqUrl.query.name;
    let id = reqUrl.query.id;
    let grade =  reqUrl.query.grade; 
    let sql;

    switch(path) {

    //*** POST ***//
        case '/post': 
  
            sql = `INSERT INTO students (name, grade) VALUES ('${name}',${grade})`;   

            con.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.write('Server failed to connect'); 
                    res.end();
                }
                else {
                    console.log(result);
                    console.log(`New Id Created: ${name} ${grade}`);
                    
                    res.writeHead(200);
                    res.write(`New Student name : ${name} and grade : ${grade}`);
                    res.end(); 
                 }
             });   
            break;

        //*** GET ***//
        case '/get':
                    
            sql = `Select * from students WHERE id= ${id}`;

            con.query(sql, function (err, result) {
                if (err){
                    console.log(err);
                    res.writeHead(500);
                    res.write('Server failed to connect'); 
                    res.end();
                }

                else {
                    if (!result.length){
                        res.writeHead(404);
                        res.write(`Id doesn't exist, enter valid id`);
                        res.end();
                        console.log(`404 not found`);
    
                    } else {
                        res.writeHead(200);
                        res.write('Showing Student Information'); 
                        res.end();
                        console.log(result);
                    } 
                }
             });                    
             break;

        //*** DELETE ***//

        case '/delete':
                        
            sql = `Delete from students  WHERE id= ${id}`;  
            con.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.write('Server failed to connect'); 
                    res.end();
                } else {

                        if (result.affectedRows == 0){
                            res.writeHead(404);
                            res.write(`Id doesn't exist, enter valid id`);
                            res.end();
                            console.log(`404 not found`);
        
                        } else {
                            res.writeHead(200);
                            res.write('Deletion Successful'); 
                            res.end();
                            console.log('Deleted');
                        }
                   }                              
                });           
   
                break;

        //*** UPDATE ***//

        case '/update':

            sql = `UPDATE students SET name= '${name}' WHERE id= ${id}`;   
    
            con.query(sql, function (err, result) {
                if (err){
                    console.log(err);
                    res.writeHead(500);
                    res.write('Server failed to connect'); 
                    res.end();
                    
                } else {
                    if (result.affectedRows == 0){
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