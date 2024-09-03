import express, { Request, Response } from "express";

const app = express();
const port = 3000;
let secuence = 0;

app.use(express.json()); //middleware

app.listen(port, () => console.log(`This server is running at port ${port}`));