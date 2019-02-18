'use strict';

const http = require('http');
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
    let path = reqUrl.pathname ;

    switch(path) {

    //*** POST ***/
        case '/post': 
            req.on('end', () => {   
                let name = reqUrl.query.name; 
                let grade =  reqUrl.query.grade; 
                let sql = `INSERT INTO students (name, grade) VALUES ('${name}',${grade})`;    
                                    
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    });
                })
                res.end('Saved to Database'); 
                break;

        //*** GET ***/
        case '/get':
        req.on('end', () => {   
            let id = reqUrl.query.id;                      
            let sql = `Select * from students WHERE id= ${id}`;

            con.query(sql, function (err, result) {
                if (err) throw err;

                if (!result.length){
                    console.log(`Id doesn't exist`);
                }
                else console.log(result);
                });
                })
             res.end('Showing Student Information');   
            break;

        //*** DELETE ***/

        case '/delete':
            req.on('end', () => { 
                let id = reqUrl.query.id;                        
                let sql = `Delete from students  WHERE id= ${id}`;  

                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    });
                    })
                res.end('Deletion Successful');  
                break;

        //*** UPDATE ***/
        case '/update':
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
                break;
  
    default:
       res.end(`

       <!doctype html>
       <html>
       <body>

           <form action="/post" method="">
                 Name <input type="text" name="name" /><br/>
                 Grade <input type="number" name="grade" /><br/>
                 <button>Save</button>
           </form>

            <br>

           <form action="/get" method="get">
                Enter User Id <input type="number" name="id" placeholder="Search" /><br/>
         </form>

         <br>

         <form action="/delete" method="">
             Delete data <input type="number" name="id" placeholder="Enter" /><br/>
         </form>

         <br>

         <form action="/update" method="">
             Update Name <input type="text" name="name" placeholder="Enter Name"/><br/>
             Enter ID <input type="number" name="id" placeholder="Id" /><br/>
         <button>Update</button>
       
         </form>

       </body>
       </html>
   `);
 }
   
});

// Start server
server.listen(port, () => console.log(`Server listening on port ${port}`));