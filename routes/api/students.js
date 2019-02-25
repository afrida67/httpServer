// Load the MySQL pool connection
const pool = require('../../database/config');
const express = require('express');
const router = express.Router();

// Get
router.get('/:id?', (req, res) => {
    const paramId = req.params.id;
    const queryId = req.query.id;
    let id;

    if(paramId && !queryId)
        id = paramId;
    else if(queryId && !paramId)
        id = queryId;

    if(!id)
        return res.send(`Please specify an id`);

    pool.query(`SELECT * FROM students WHERE id = ${id}`, id, (err, result) => {
        if (err) throw err;
        if (!result.length) {
            return res.status(404).json({ msg: `ID not found`});
        }
        res.send(result);
    });
});

// Create 
router.post('/', (req, res) => {

    pool.query('INSERT INTO students SET ?', req.body, (error, result) => {
        if (error) throw error;
        res.status(201).json({ msg: `User added with ID: ${result.insertId}`});
    });

});
// Update 
router.put('/:id', (req, res) => {

  

  });

// Delete Member
router.delete('/:id', (req, res) => {
    const paramId = req.params.id;
    const queryId = req.query.id;
    let id;

    if(paramId && !queryId)
        id = paramId;
    else if(queryId && !paramId)
        id = queryId;

    if(!id)
        return res.send(`Please specify an id`);

    pool.query(`DELETE FROM members WHERE id = ${id}`, id, (err, result) => {
        if (err) throw err;
        if (!result.length) {
            return res.status(404).json({ msg: `ID not found`});
        }
        res.send(result);
    });
  });

module.exports = router;