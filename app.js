const http = require('http');
const port = 3000;
const server = http.createServer();
const { parse } = require('querystring');

server.on("request", (req, res) => {
    if (req.method === 'POST'){
        let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        console.log(
            parse(body)
        );
        res.end('Saved to Database');
    });
   }
   else{
       res.end(`
       <!doctype html>
       <html>
       <body>
           <form action="/" method="post">
             Name <input type="text" name="name" /><br />
             Roll <input type="number" name="age" /><br />
             Department <input type="text" name="dept" /><br />
               <button>Save</button>
           </form>
       </body>
       </html>
   `);
   }
});

// Start server
server.listen(port, () => console.log(`Server listening on port ${port}`));