/**
 * param: botanikusID (int)
 * Elmenti az adott ID-re a bevitt adatokat
 * Ha nincs botanikus ilyen ID-vel akkor létrehoz egyet a bevitt adatokkal
 * Ha van már ilyen ID-vel botanikus akkor átírja az adatait a bevitt adatokra
 */

const requireOption = require('../common/requireOption');

 module.exports = function (objectrepository) {
    const BotanikusModel = requireOption(objectrepository, 'BotanikusModel');

    return function(req, res, next) {
        if (
            typeof req.body.nev === 'undefined' ||
            typeof req.body.eletkor === 'undefined' ||
            typeof req.body.elvesztettKesztyuk === 'undefined' ||
            typeof req.body.korabbiAllas === 'undefined' 

        ) {
            return next();
        }

        if (typeof res.locals.botanikus === 'undefined') {
            res.locals.botanikus = new BotanikusModel();
        }

        res.locals.botanikus.nev = req.body.nev;
        res.locals.botanikus.eletkor = req.body.eletkor;
        res.locals.botanikus.elvesztettKesztyuk = req.body.elvesztettKesztyuk;
        res.locals.botanikus.korabbiAllas = req.body.korabbiAllas;

        res.locals.botanikus.save().then(()=>
            {return res.redirect('/botanikusok');
        });
    };

 };