import express, { Request, Response } from "express";
import { Database, OPEN_READWRITE } from 'sqlite3';

const app = express();
const sqlite3 = require('sqlite3').verbose();
const port = 3000;
let secuence = 0;

// Connect to SQLite database
const db = new Database('./my-database.db', OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

//middleware
app.use(express.json()); 

// Endpoints

//Get cirugia
app.get('api/cirugia', (req: Request, res: Response) => {
    // Codigo para requestiar datos del sqlite
    const sql ='SELECT * FROM cirugia'
    db.all(sql, [], (err, rows) => {
        if(err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'Success',
            data: rows
        });
    });
});

// Post cirugia
app.post('api/cirugia', (req: Request, res: Response) => {
    // Codigo para agregar una cirugia
    
});


app.listen(port, () => console.log(`This server is running at port ${port}`));