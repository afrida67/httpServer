const http = require('http');
const port = 3000;
const server = http.createServer();
const { parse } = require('querystring');
const mysql = require('mysql');
const url = require('url'); 

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

   else if (reqUrl.pathname === '/get'){

        req.on('end', () => {   
            let id= reqUrl.query.id;                      
            let sql = `Select * from students where id= ${id}`;     
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                });
                })
            res.end();   
    }
    else if (reqUrl.pathname === '/delete'){

            req.on('end', () => { 
                let id= reqUrl.query.id;                        
                let sql = `Delete from students where id= ${id}`;     
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    });
                    })
                res.end();   
    }
    else if (reqUrl.pathname === '/update'){

        req.on('end', () => { 
           // let sql = "UPDATE students SET name = 'Moyna' WHERE grade = 56";
           let name= reqUrl.query.name;
          // let grade= reqUrl.query.grade;

           let sql = `UPDATE students SET name= ${name} WHERE id= 14`;    
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                });
                })
            res.end();   
    }
   else{
       res.end(`
       <!doctype html>
       <html>
       <body>
           <form action="/" method="post">
             Name <input type="text" name="name" /><br />
             Roll <input type="number" name="grade" /><br />
               <button>Save</button>
           </form>

       </body>
       </html>
   `);
   }
   
});

// Start server
server.listen(port, () => console.log(`Server listening on port ${port}`));