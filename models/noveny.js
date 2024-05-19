const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Noveny = db.model('Noveny', {
    nev: String,
    _botanikus: {
        type: Schema.Types.ObjectId,
        ref: 'Botanikus'
    },
    viragIze: String,
    viragzasIdeje: String
    
});

module.exports = Noveny;