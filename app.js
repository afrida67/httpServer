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
        });

        req.on('end', () => {           
            let data = parse(body);              
            //let sql = "INSERT INTO students (name, grade) VALUES (afrida, 4)";
              let sql = `INSERT INTO students (name, grade) VALUES ('${data.name}',${data.grade})`;     
               con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                });
                })
            res.end('Saved to Database');
        
   }
 /*  else if (req.method === 'DELETE'){
        console.log('is this even working');
        let sql = `DELETE FROM students WHERE grade = ${data.grade}`;     
       // let sql = "DELETE FROM students WHERE id = 10";     
        con.query(sql, function(error,result){
            if(!!error) {
            console.log ('err');
            } else {
            console.log('Deleted');
            console.log(result);
                res.end(JSON.stringify(result));
            }
    });
   }*/

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


           <form action="/" method="delete">
                ID <input type="number" name="grade" /><br />
                <button>Delete</button>
         </form>

       </body>
       </html>
   `);
   }
});

// Start server
server.listen(port, () => console.log(`Server listening on port ${port}`));