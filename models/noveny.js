const Schema = require('mongoose').Schema;
const db = require('../config/db');

const NovenySchema = new Schema({
    nev: String,
    _botanikus: {
        type: Schema.Types.ObjectId,
        ref: 'Botanikus'
    },
    viragIze: String,
    viragzasIdeje: String
});

const Noveny = db.model('Noveny', NovenySchema);


module.exports = Noveny;