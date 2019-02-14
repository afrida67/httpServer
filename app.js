const http = require('http');
const port = 3000;
const server = http.createServer();
const { parse } = require('querystring');
const mysql = require('mysql');

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
    if (req.method === 'POST'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
           // body = JSON.stringify(body);

        });

        req.on('end', () => {
            console.log(parse(body));

              //  let sql = "INSERT INTO students ('"+body.name+"') VALUES (?)";
              let sql = "INSERT INTO students (name, grade) VALUES ('Afrida',67)";     
               con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                });
                })
            res.end('Saved to Database');
        
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