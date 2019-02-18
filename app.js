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
    
    //*** POST ***//
    if (reqUrl.pathname === '/post'){

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
   }
   //*** GET ***//
   else if (reqUrl.pathname === '/get'){

        req.on('end', () => {   
            let id = reqUrl.query.id;                      
            let sql = `Select * from students  WHERE id= ${id} `; 

            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                });
                })
            res.end('Showing Student Information');   
    }
     //*** DELETE ***//
    else if (reqUrl.pathname === '/delete'){

        req.on('end', () => { 

            let id = reqUrl.query.id;                        
            let sql = `Delete from students  WHERE id= ${id}`;  

            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                });
                })
            res.end('Deletion Successful');   
    }
     //*** UPDATE ***//
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
   else {
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