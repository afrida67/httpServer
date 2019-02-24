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
app.post('/api', (request, response) => {
    pool.query(`INSERT INTO students SET ?`, request.body, (err, result) => {
        if (err) throw err;

        response.status(201).send(`User added with ID: ${result.insertId}`);
    });
});

// display a single student
app.get('/api/:id', (request, response) => {
    const id = request.params.id;

    pool.query(`SELECT * FROM students WHERE id = ?`, id, (err, result) => {
        if (err) throw err;
        response.send(result);
    });
});


// delete a student id
app.delete('/api/:id', (request, response) => {
    const id = request.params.id;

    pool.query(`DELETE FROM students WHERE id = ?`, id, (err, result) => {
        if (err) throw err;
        response.send('Student deleted.');
    });
});

// update a student account

app.put('/api/:id', (request, response) => {
    const id = request.params.id;

    pool.query(`UPDATE students SET ? WHERE id = ?`, [request.body, id], (err, result) => {
        if (err) throw err;

        response.send('Updated successfully.');
    });
});

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));
