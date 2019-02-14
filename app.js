'use strict';

const http = require('http');
const { parse } = require('querystring');
const mysql = require('mysql');
const url = require('url'); 

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
    console.log("Connected!");
});

server.on('request', (req, res) => {

    const reqUrl = url.parse(req.url, true);
    
    //*** POST ***/
    if (req.method === 'POST'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {  

            let data = parse(body);              
            let sql = `INSERT INTO students (name, grade) VALUES ('${data.name}',${data.grade})`;    

            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                });
                })
            res.end('Saved to Database');
        
   }
   //*** GET ***/
   else if (reqUrl.pathname === '/get'){

        req.on('end', () => {   
            let id = reqUrl.query.id;                      
            let sql = `Select * from students where id= ${id}`; 

            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                });
                })
            res.end('Showing Student Information');   
    }
     //*** DELETE ***/
    else if (reqUrl.pathname === '/delete'){

            req.on('end', () => { 
                let id = reqUrl.query.id;                        
                let sql = `Delete from students where id= ${id}`;  

                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    });
                    })
                res.end('Deletion Successful');   
    }
     //*** UPDATE ***/
    else if (reqUrl.pathname === '/update'){

        req.on('end', () => { 
           let name = reqUrl.query.name;
           let id = reqUrl.query.id;  
           let sql = `UPDATE students SET name= '${name}' WHERE id= ${id}`;   

            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                });
                })
            res.end('DB has been updated');   
    }
   else{
       res.end(`
       <!doctype html>
       <html>
       <body>
           <form action="/" method="post">
             Name <input type="text" name="name" /><br />
             Grade <input type="number" name="grade" /><br />
               <button>Save</button>
           </form>

       </body>
       </html>
   `);
   }
   
});

// Start server
server.listen(port, () => console.log(`Server listening on port ${port}`));