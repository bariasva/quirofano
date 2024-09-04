"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const app = (0, express_1.default)();
const port = 3000;
//middleware
app.use(express_1.default.json());
// Endpoints
//Get cirugia
app.get('/api/cirugia', (req, res) => {
    // Codigo para requestiar datos del sqlite
    const db = new better_sqlite3_1.default('database.sqlite');
    const getSurgery = db.prepare('SELECT * FROM WaitingList');
    const results = getSurgery.all();
    res.json(results);
    db.close();
});
// Post cirugia
app.post('api/cirugia', (req, res) => {
    // Codigo para agregar una cirugia
});
app.listen(port, () => console.log(`This server is running at port ${port}`));
