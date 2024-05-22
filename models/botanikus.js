const Schema = require('mongoose').Schema;
const db = require('../config/db');

const botanikusSchema = new Schema({
    nev: String,
    eletkor: Number,
    elvesztettKesztyuk: String,
    korabbiAllas: String
});

const Botanikus = db.model('Botanikus', botanikusSchema);

module.exports = Botanikus;