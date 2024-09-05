import express, { Request, Response } from "express";
import Database from 'better-sqlite3';

const app = express();
const port = 3000;

//middleware
app.use(express.json()); 

// Endpoints

//Get cirugia

app.get('/api/cirugia', (req: Request, res: Response) => {
    // Codigo para requestiar datos del sqlite
    const db = new Database('database.sqlite');

    const getSurgery = db.prepare('SELECT * FROM WaitingList');
    const results = getSurgery.all();

    res.json(results);
    db.close();
});


// Post cirugia
app.post('/api/cirugia', (req: Request, res: Response) => {
    // Codigo para agregar una cirugia
    const {SurgeryID, PatientName, SurgeonName, StaffList, StartTime, EndTime, TypeOfSurgery, Status } = req.body;
    const db = new Database('database.sqlite');

    const addSurgery = db.prepare(`INSERT INTO Surgery (SurgeryID, PatientName, SurgeonName, StaffList,
        StartTime, EndTime, TypeOfSurgery, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    const results = addSurgery.all(SurgeryID, PatientName, SurgeonName, StaffList, StartTime, EndTime, TypeOfSurgery, Status);

    res.status(201).json(results);
    db.close();
});

app.listen(port, () => console.log(`This server is running at port ${port}`));