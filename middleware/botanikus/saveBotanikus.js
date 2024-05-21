/**
 * param: botanikusID (int)
 * Elmenti az adott ID-re a bevitt adatokat
 * Ha nincs botanikus ilyen ID-vel akkor létrehoz egyet a bevitt adatokkal
 * Ha van már ilyen ID-vel botanikus akkor átírja az adatait a bevitt adatokra
 */

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    const BotanikusModel = requireOption(objectrepository, 'BotanikusModel');

    return function (req, res, next) {

        console.log(req.body);
        if (
            typeof req.body.nev === 'undefined' ||
            typeof req.body.eletkor === 'undefined' ||
            typeof req.body.elvesztettKesztyuk === 'undefined' ||
            typeof req.body.korabbiAllas === 'undefined'

        ) {
            console.log('next');
            return next();
        }


        const nev = req.body.nev;
        const eletkor = req.body.eletkor;
        const elvesztettKesztyuk = req.body.elvesztettKesztyuk;
        const korabbiAllas = req.body.korabbiAllas;

        const botanikus = new BotanikusModel();
        botanikus.nev = nev;
        botanikus.eletkor = eletkor;
        botanikus.elvesztettKesztyuk = elvesztettKesztyuk;
        botanikus.korabbiAllas = korabbiAllas;


        botanikus.save().then(() => {
            return res.redirect('/botanikusok');
        });
    };

};