const pool = require('../../database/config');
const express = require('express');
const router = express.Router();
const createError = require('http-errors');

//Middleware
router.use(function (err, req, res, next){
    res.send(404, err.message);
    next();
});
  
// Get
router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    pool.query(`SELECT * FROM students WHERE id =?`, id, (err, result) => {
            if (err){
                let err = new Error('Not Connected');
                next(err);
            } else {
                    if (!result.length) {
                        console.log('ID not found');
                        return next(createError(404, 'Id does not exist!'));
                    }
                    res.send(result);
            }
    });
});

// Create 
router.post('/', (req, res, next) => {

    pool.query(`INSERT INTO students SET ?`, req.body, (err, result) => {
        if (err) {
            let err = new Error('Not Connected');
            next(err);
        } else {
            res.status(201).json({ msg: `Student added with ID: ${result.insertId}`});
        }
    });

});
// Update 
router.put('/:id', (req, res, next) => {

    const id = req.params.id;

    pool.query(`UPDATE students SET ? WHERE id = ?`, [req.body, id], (err, result) => {
        if (err) {
            let err = new Error('Not Connected');
            next(err);
        } else {
            if (result.affectedRows == 0) {
                console.log('ID not found');
                return next(createError(404, 'Id does not exist!'));
            }
            res.status(201).json({ msg: `Updated successfully`});
        }

    });
  });

// Delete
router.delete('/:id', (req, res, next) => {

    const id = req.params.id;

    pool.query(`DELETE FROM students WHERE id = ?`, id, (err, result) => {
        if (err) {
            let err = new Error('Not Connected');
            next(err);
        } else {
            if (result.affectedRows == 0) {
                console.log('ID not found');
                return next(createError(404, 'Id does not exist!'));
            }
            res.status(201).json({ msg: `ID Deleted`});
        }
    });
  });

module.exports = router;