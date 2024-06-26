/**
 * param: botanikusID (int)
 * Elmenti az adott ID-re a bevitt adatokat
 * Ha nincs botanikus ilyen ID-vel akkor létrehoz egyet a bevitt adatokkal
 * Ha van már ilyen ID-vel botanikus akkor átírja az adatait a bevitt adatokra
 */

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    const BotanikusModel = requireOption(objectrepository, 'BotanikusModel');

    return async (req, res, next) =>{

        if (
            typeof req.body.nev === 'undefined' ||
            typeof req.body.eletkor === 'undefined' ||
            typeof req.body.elvesztettKesztyuk === 'undefined' ||
            typeof req.body.korabbiAllas === 'undefined'

        ) {
            return next();
        }

        var botanikus = await BotanikusModel.findById(req.params.botanikusid);
        if(!botanikus){
            botanikus = new BotanikusModel();
        }
        
        botanikus.nev = req.body.nev;
        var eletkor
        if(!isNaN(req.body.eletkor)){
            botanikus.eletkor = req.body.eletkor;
        }else{
            //Aki rossz adatot ad meg pórul jár
            botanikus.eletkor = 0;
        }
        botanikus.elvesztettKesztyuk = req.body.elvesztettKesztyuk;
        botanikus.korabbiAllas = req.body.korabbiAllas;

        botanikus.save().then(() => {
            return res.redirect('/botanikusok');

        });
    };

};