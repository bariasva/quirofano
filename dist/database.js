"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const db = new better_sqlite3_1.default("./database.sqlite");
db.exec(`
  CREATE TABLE IF NOT EXISTS Surgery (
    SurgeryID INTEGER PRIMARY KEY AUTOINCREMENT,
    PatientName TEXT NOT NULL,
    SurgeonName TEXT NOT NULL,
    StaffList TEXT,
    StartTime DATETIME,
    EndTime DATETIME,
    TypeOfSurgery TEXT NOT NULL,
    Status TEXT CHECK(Status IN ('Scheduled', 'In Progress', 'Completed', 'Cancelled')) NOT NULL
  );
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS WaitingList (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    PatientName TEXT NOT NULL,
    ReasonForWaiting TEXT NOT NULL,
    DateAdded DATE NOT NULL,
    PriorityLevel TEXT CHECK(PriorityLevel IN ('Low', 'Medium', 'High')) NOT NULL
  );
`);
db.close();
//# sourceMappingURL=database.js.map