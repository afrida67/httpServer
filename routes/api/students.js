const pool = require('../../database/config');
const express = require('express');
const router = express.Router();
let check = false;

//Middleware
router.use(function (req, res, next){

    pool.getConnection(function(err) {
      if (err) {
        res.status(500).json({ msg: `Server Down`});
      } else {
        console.log(`Connected`);
        if(check === true){
            console.log('ID not found');
            return res.status(404).json({ msg: `ID not found`});
        }
      }
    });
    next();
  });
  
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
            if (!result.length) {
                check = true;
                return;
            }
            res.send(result);
        
    });
});

// Create 
router.post('/', (req, res) => {

    pool.query(`INSERT INTO students SET ?`, req.body, (err, result) => {

        res.status(201).json({ msg: `Student added with ID: ${result.insertId}`});
    });

});
// Update 
router.put('/:id', (req, res) => {

    const id = req.params.id;

    pool.query(`UPDATE students SET ? WHERE id = ?`, [req.body, id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows == 0) {
            check = true;
            return;
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
            check = true;
            return;
        }
        res.status(201).json({ msg: `ID Deleted`});
    });
  });

module.exports = router;