const express = require('express');
const router = express.Router();
const connection = require('./db'); 

router.get('/', (req, res) => {
    const category = req.query.category;
    connection.query('SELECT cat_id FROM categories WHERE cat_title = ?', [category], (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.length > 0) {
            const categoryId = results[0].cat_id;
            connection.query('SELECT * FROM product WHERE cat_id = ?', [categoryId], (error, results, fields) => {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                res.json(results);
            });
        } else {
            console.error('Category not found');
            res.status(404).json({ error: 'Category not found' });
        }
    });
});

module.exports = router;