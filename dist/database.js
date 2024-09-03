"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const db = new better_sqlite3_1.default("./database.sqlite");
db.exec(`
  CREATE TABLE IF NOT EXISTS Surgeon (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Specialty TEXT NOT NULL,
    ContactInfo TEXT NOT NULL
  );
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS Staff (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Role TEXT NOT NULL,
    ContactInfo TEXT NOT NULL
  );
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS OperatingRoom (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    RoomNumber TEXT NOT NULL UNIQUE,
    Status TEXT CHECK(Status IN ('Available', 'Occupied')) NOT NULL,
    EquipmentAvailable TEXT
  );
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS Patient (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    MedicalRecordNumber TEXT NOT NULL UNIQUE,
    ContactInfo TEXT NOT NULL,
    Diagnosis TEXT,
    PriorityStatus TEXT CHECK(PriorityStatus IN ('Low', 'Medium', 'High'))
  );
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS Surgery (
    SurgeryID INTEGER PRIMARY KEY AUTOINCREMENT,
    PatientID INTEGER NOT NULL,
    SurgeonID INTEGER NOT NULL,
    StaffList TEXT,
    StartTime DATETIME,
    EndTime DATETIME,
    TypeOfSurgery TEXT NOT NULL,
    Status TEXT CHECK(Status IN ('Scheduled', 'In Progress', 'Completed', 'Cancelled')) NOT NULL,
    FOREIGN KEY (PatientID) REFERENCES Patient(ID),
    FOREIGN KEY (SurgeonID) REFERENCES Surgeon(ID)
  );
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS WaitingList (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    PatientID INTEGER NOT NULL,
    ReasonForWaiting TEXT NOT NULL,
    DateAdded DATE NOT NULL,
    PriorityLevel TEXT CHECK(PriorityLevel IN ('Low', 'Medium', 'High')) NOT NULL,
    FOREIGN KEY (PatientID) REFERENCES Patient(ID)
  );
`);
db.close();
