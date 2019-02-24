'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

const port = 3000;

const config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'sys',
};

const pool = mysql.createPool(config);

//  body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/', (request, response) => {
    response.send({
        message: 'Create New Student Account'
    });
});

// add a new student
app.post('/api/post', (request, response) => {
    pool.query(`INSERT INTO students SET ?`, request.body, (err, result) => {
        if (err) throw err;

        response.status(201).send(`User added with ID: ${result.insertId}`);
    });
});

// display a single student
app.get('/api/get/:id?', (request, response) => {
    const paramId = request.params.id;
    const queryId = request.query.id;
    let id;

    if(paramId && !queryId)
        id = paramId;
    else if(queryId && !paramId)
        id = queryId;

    if(!id)
        return response.send(`Please specify an id`);

    pool.query(`SELECT * FROM students WHERE id = ${id}`, id, (err, result) => {
        if (err) throw err;

        response.send(result);
    });
});


// delete a student id
app.delete('/api/del/:id?', (request, response) => {
    const paramId = request.params.id;
    const queryId = request.query.id;
    let id;

    if(paramId && !queryId)
        id = paramId;
    else if(queryId && !paramId)
        id = queryId;

    if(!id)
        return response.send(`Please specify an id`);

    pool.query(`DELETE FROM students WHERE id = ${id}`, id, (err, result) => {
        if (err) throw err;
        response.send('ID deleted.');
    });
});



// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});
