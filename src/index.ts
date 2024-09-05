import express, { Request, Response } from "express";
import Database from "better-sqlite3";

const app = express();
const port = 3000;
let secuence = 0;

app.use(express.json()); //middleware

// Endpoints

//Get ALL surgeries

app.get("/api/cirugia", (req: Request, res: Response) => {
  // Codigo para requestiar datos del sqlite
  const db = new Database("database.sqlite");

  const statement = db.prepare("SELECT * FROM Surgery");
  const rows = statement.all();

  if (rows) {
    res.json(rows);
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }

  db.close();
});

// Create a new surgery record
app.post("/api/cirugia", (req: Request, res: Response) => {
  const { name, date, surgeon } = req.body;

  if (!name || !date || !surgeon) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const db = new Database("database.sqlite");

  const statement = db.prepare(
    "INSERT INTO surgeries (name, date, surgeon) VALUES (?, ?, ?)"
  );
  const result = statement.run(name, date, surgeon);

  if (result.changes > 0) {
    res.status(201).json({ message: "Surgery record created successfully" });
  } else {
    res.status(500).json({ error: "Failed to create surgery record" });
  }

  db.close();
});

app.listen(port, () => console.log(`This server is running at port ${port}`));
