/**
 * param: novenyID (int)
 * Elmenti az adott ID-re a bevitt adatokat
 * Ha nincs növény ilyen ID-vel akkor létrehoz egyet a bevitt adatokkal
 * Ha van már ilyen ID-vel növény akkor átírja az adatait a bevitt adatokra
 */

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    const NovenyModel = requireOption(objectrepository, 'NovenyModel');

    return function (req, res, next) {
        console.log(req.body);
        if (
            typeof req.body.nev === 'undefined' ||
            typeof req.body.viragIze === 'undefined' ||
            typeof req.body.viragzasIdeje === 'undefined'
        ) {
            return next();
        }

        const noveny = new NovenyModel();

        noveny.nev = req.body.nev;
        noveny.viragIze = req.body.viragIze;
        noveny.viragzasIdeje = req.body.viragzasIdeje;
        // noveny._botanikus = res.locals.botanikus._id; // mindig undefined mert a res.locals üres

        noveny.save().then(() => {
            return res.redirect(`/novenyek`);
        }).catch(err => {
            console.log(err);
            return res.status(500).json({ message: 'error' });
        });
    };
};