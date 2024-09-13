import Database from "better-sqlite3";

const db = new Database("./database.sqlite");

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
