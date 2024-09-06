import express, { Request, Response } from "express";
import Database from "better-sqlite3";

const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const path = require("path");

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend")));

// Endpoints Cirugia

//Get cirugia
app.use(express.static("frontend"));

app.get("/api/cirugia", (req: Request, res: Response) => {
  // Codigo para requestiar datos del sqlite
  const db = new Database("database.sqlite");

  const getSurgery = db.prepare("SELECT * FROM Surgery");
  const results = getSurgery.all();

  res.json(results);
  //   db.close();
});

// Post cirugia
app.post("/api/cirugia", (req: Request, res: Response) => {
  // Codigo para agregar una cirugia
  const {
    SurgeryID,
    PatientName,
    SurgeonName,
    StaffList,
    StartTime,
    EndTime,
    TypeOfSurgery,
    Status,
  } = req.body;
  const db = new Database("database.sqlite");

  const addSurgery =
    db.prepare(`INSERT INTO Surgery (SurgeryID, PatientName, SurgeonName, StaffList,
        StartTime, EndTime, TypeOfSurgery, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  const results = addSurgery.run(
    SurgeryID,
    PatientName,
    SurgeonName,
    StaffList,
    StartTime,
    EndTime,
    TypeOfSurgery,
    Status
  );

  res.status(201).json({ data: results });
  db.close();
});

// EndPoints WaitingList

// Get WaitingList
app.get("/api/waitinglist", (req: Request, res: Response) => {
  const db = new Database("database.sqlite");

  const getWaitingList = db.prepare("SELECT * FROM WaitingList");
  const results = getWaitingList.all();

  res.json(results);
  db.close();
});

// Insert a new surgery to waiting list
app.post("/api/waitinglist", (req: Request, res: Response) => {
  const { ID, PatientID, ReasonForWaiting, DateAdded, PriorityLevel } =
    req.body;
  const db = new Database("database.sqlite");

  const insertSurgery =
    db.prepare(`INSERT INTO WaitingList (ID, PatientID, ReasonForWaiting, 
        DateAdded, PriorityLevel) VALUES (?, ?, ?, ?, ?)`);
  const results = insertSurgery.run(
    PatientID,
    ReasonForWaiting,
    DateAdded,
    PriorityLevel
  );

  res.status(201).json({
    msg: "Surgery added succesfully",
    data: results,
  });
  db.close();
});

app.listen(port, () => console.log(`This server is running at port ${port}`));
