import Database from "better-sqlite3";

const db = new Database("./database.sqlite");

/* db.exec(`
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
`); */

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
    PatientID TEXT NOT NULL,
    ReasonForWaiting TEXT NOT NULL,
    DateAdded DATE NOT NULL,
    PriorityLevel TEXT CHECK(PriorityLevel IN ('Low', 'Medium', 'High')) NOT NULL
  );
`);

db.close();