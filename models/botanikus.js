const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Botanikus = db.model('Botanikus', {
    nev: String,
    eletkor: Number,
    elvesztettKesztyuk: String,
    korabbiAllas: String
    
});

module.exports = Botanikus;