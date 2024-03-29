const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 5003;

// Middleware
app.use(express.json());
app.use(cors());

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'melek123',
    database: 'e-commerce',
    connectionLimit: 10 // Adjust as needed
});

// Route to check if a username exists
app.get('/users/login', async (req, res) => {
    const { username,password } = req.query;
  
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM users WHERE username = ? and password = ?', [username,password]);
        connection.release();

        if (rows.length > 0) {
            res.status(200).json({ exists: true, user: rows[0] });
        } else {
            res.status(404).json({ exists: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch products by category
app.get('/products', async (req, res) => {
    const category = req.query.category;
  
    try {
        const connection = await pool.getConnection();
        const [categoryRows] = await connection.execute('SELECT cat_id FROM categories WHERE cat_title = ?', [category]);
        
        if (categoryRows.length > 0) {
            const categoryId = categoryRows[0].cat_id;
            const [productRows] = await connection.execute('SELECT * FROM product WHERE cat_id = ?', [categoryId]);
            connection.release();
            res.json(productRows);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/users/signup', async (req, res) => {
    const { username, password, email, num, amount } = req.body;
  
    try {
        const connection = await pool.getConnection();
        const [existingUsers] = await connection.execute('SELECT * FROM users WHERE num = ?', [num]);

        if (existingUsers.length > 0) {
            connection.release();
            return res.status(400).json({ error: 'User already exists' });
        }

        await connection.execute('INSERT INTO users (num, username, password, email, amount) VALUES (?, ?, ?, ?, ?)', [num, username, password, email, amount]);
        connection.release();

        res.status(200).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
