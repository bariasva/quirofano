"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const app = (0, express_1.default)();
const port = 3000;
const bodyParser = require("body-parser");
const path = require("path");
//middleware
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_1.default.static(path.join(__dirname, "frontend")));
// Endpoints Cirugia
//Get cirugia
app.use(express_1.default.static("frontend"));
app.get("/api/cirugia", (req, res) => {
    // Codigo para requestiar datos del sqlite
    const db = new better_sqlite3_1.default("database.sqlite");
    const getSurgery = db.prepare("SELECT * FROM Surgery");
    const results = getSurgery.all();
    res.json(results);
    //   db.close();
});
// Post cirugia
app.post("/api/cirugia", (req, res) => {
    // Codigo para agregar una cirugia
    const { SurgeryID, PatientName, SurgeonName, StaffList1, StaffList2, StaffList3, StartTime, EndTime, TypeOfSurgery, Status, } = req.body;
    const db = new better_sqlite3_1.default("database.sqlite");
    const StaffList = `${StaffList1}, ${StaffList2}, ${StaffList3}`;
    const addSurgery = db.prepare(`INSERT INTO Surgery (SurgeryID, PatientName, SurgeonName, StaffList,
        StartTime, EndTime, TypeOfSurgery, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    const results = addSurgery.run(SurgeryID, PatientName, SurgeonName, StaffList, StartTime, EndTime, TypeOfSurgery, Status);
    res.status(201).json({ data: results });
    db.close();
});
// EndPoints WaitingList
// Get WaitingList
app.get("/api/waitinglist", (req, res) => {
    const db = new better_sqlite3_1.default("database.sqlite");
    const getWaitingList = db.prepare("SELECT * FROM WaitingList");
    const results = getWaitingList.all();
    res.json(results);
    db.close();
});
// Insert a new surgery to waiting list
app.post("/api/waitinglist", (req, res) => {
    const { PatientName, ReasonForWaiting, DateAdded, PriorityLevel } = req.body;
    const db = new better_sqlite3_1.default("database.sqlite");
    const insertSurgery = db.prepare(`INSERT INTO WaitingList (PatientName, ReasonForWaiting, 
        DateAdded, PriorityLevel) VALUES (?, ?, ?, ?)`);
    const results = insertSurgery.run(PatientName, ReasonForWaiting, DateAdded, PriorityLevel);
    res.status(201).json({
        msg: "Surgery added succesfully",
        data: results,
    });
    db.close();
});
app.listen(port, () => console.log(`This server is running at port ${port}`));
//# sourceMappingURL=index.js.map