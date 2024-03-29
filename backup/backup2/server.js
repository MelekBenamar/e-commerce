const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 5003;

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'melek123',
    database: 'e-commerce' 
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Route to fetch data from the product table
app.get('/products', (req, res) => {
    
    const category = req.query.category;
    connection.query('SELECT cat_id FROM categories WHERE cat_title = ?', [category], (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            // Handle error
        } else {
            // Extract the cat_id from the results
            if (results.length > 0) {
                const categoryId = results[0].cat_id;
                console.log('Category ID:', categoryId);
                // Query the product table
                connection.query('SELECT * FROM product WHERE cat_id = ?', [categoryId], (error, results, fields) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                        return;
                    }
                    // Send the results as JSON response
                    res.json(results);
                });
            } else {
                console.error('Category not found');
                // Handle the case where the category title is not found
            }
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
