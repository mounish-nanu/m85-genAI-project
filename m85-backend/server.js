require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jwt-simple');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Set up MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to the MySQL database!');

    // Create tables and seed data
    initializeDatabase();
});

// Function to create tables and seed data only if they don't already exist
async function initializeDatabase() {
    const createSummaryTable = `
        CREATE TABLE IF NOT EXISTS summary_chart (
            id INT AUTO_INCREMENT PRIMARY KEY,
            month VARCHAR(50),
            value INT
        )
    `;

    const createReportsTable = `
        CREATE TABLE IF NOT EXISTS reports_chart (
            id INT AUTO_INCREMENT PRIMARY KEY,
            application VARCHAR(50),
            value INT
        )
    `;

    // Create tables if they don't exist
    db.query(createSummaryTable, (err) => {
        if (err) console.error('Error creating summary_chart table:', err);
        else console.log('summary_chart table created or already exists.');
    });

    db.query(createReportsTable, (err) => {
        if (err) console.error('Error creating reports_chart table:', err);
        else console.log('reports_chart table created or already exists.');
    });

    // Check if summary_chart table is empty before inserting data
    db.query('SELECT COUNT(*) AS count FROM summary_chart', (err, results) => {
        if (err) {
            console.error('Error checking summary_chart table:', err);
            return;
        }

        const count = results[0].count;
        if (count === 0) {
            const insertSummaryData = `
                INSERT INTO summary_chart (month, value) VALUES
                ('January', 30),
                ('February', 45),
                ('March', 60),
                ('April', 80),
                ('May', 100),
                ('June', 120)
            `;
            db.query(insertSummaryData, (err) => {
                if (err) console.error('Error inserting data into summary_chart:', err);
                else console.log('Initial data inserted into summary_chart.');
            });
        } else {
            console.log('summary_chart table already contains data. Skipping insertion.');
        }
    });

    // Check if reports_chart table is empty before inserting data
    db.query('SELECT COUNT(*) AS count FROM reports_chart', (err, results) => {
        if (err) {
            console.error('Error checking reports_chart table:', err);
            return;
        }

        const count = results[0].count;
        if (count === 0) {
            const insertReportsData = `
                INSERT INTO reports_chart (application, value) VALUES
                ('Computer Vision', 50),
                ('NLP', 80),
                ('Speech Synthesis', 70),
                ('Art Generation', 60),
                ('Gaming', 90)
            `;
            db.query(insertReportsData, (err) => {
                if (err) console.error('Error inserting data into reports_chart:', err);
                else console.log('Initial data inserted into reports_chart.');
            });
        } else {
            console.log('reports_chart table already contains data. Skipping insertion.');
        }
    });
}

// Middleware
app.use(cors());
app.use(express.json());

// JWT Secret Key from environment
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret';

// Routes
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'Nanu' && password === 'Nanu') {
        const payload = {
            username,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 // Token expires in 1 hour
        };

        const token = jwt.encode(payload, SECRET_KEY);
        return res.status(200).json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Chart data routes
app.get('/chart1', (req, res) => {
    const query = 'SELECT month, value FROM summary_chart';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching chart1 data:', err);
            return res.status(500).json({ message: 'Error fetching data' });
        }
        res.json(results);
    });
});

app.get('/chart2', (req, res) => {
    const query = 'SELECT application, value FROM reports_chart';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching chart2 data:', err);
            return res.status(500).json({ message: 'Error fetching data' });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
