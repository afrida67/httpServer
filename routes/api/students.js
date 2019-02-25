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

    pool.query(`INSERT INTO students SET ?`, req.body, (err, result) => {
        if (err) throw err;
        res.status(201).json({ msg: `Student added with ID: ${result.insertId}`});
    });

});
// Update 
router.put('/:id', (req, res) => {

    const id = req.params.id;

    pool.query(`UPDATE students SET ? WHERE id = ?`, [req.body, id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows == 0) {
            return res.status(404).json({ msg: `ID not found`});
        }
        res.status(201).json({ msg: `Updated successfully`});
    });
  });

// Delete
router.delete('/:id?', (req, res) => {
    const paramId = req.params.id;
    const queryId = req.query.id;
    let id;

    if(paramId && !queryId)
        id = paramId;
    else if(queryId && !paramId)
        id = queryId;

    if(!id)
        return res.send(`Please specify an id`);

    pool.query(`DELETE FROM students WHERE id = ${id}`, id, (err, result) => {
        if (err) throw err;
        if (result.affectedRows == 0) {
            return res.status(404).json({ msg: `ID not found`});
        }
        res.status(201).json({ msg: `ID Deleted`});
    });
  });

module.exports = router;