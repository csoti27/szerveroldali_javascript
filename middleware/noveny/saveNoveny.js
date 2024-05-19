/**
 * param: novenyID (int)
 * Elmenti az adott ID-re a bevitt adatokat
 * Ha nincs növény ilyen ID-vel akkor létrehoz egyet a bevitt adatokkal
 * Ha van már ilyen ID-vel növény akkor átírja az adatait a bevitt adatokra
 */

 const requireOption = require('../common/requireOption');

 module.exports = function (objectrepository) {
    const NovenyModel = requireOption(objectrepository, 'NovenyModel');

    return function(req, res, next) {
        if (
            typeof req.body.nev === 'undefined' ||
            typeof req.body.viragIze === 'undefined' ||
            typeof req.body.viragzasIdeje === 'undefined' ||
            typeof res.locals.botanikus === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.botanikus === 'undefined') {
            res.locals.botanikus = new NovenyModel();
        }

        res.locals.noveny.nev = req.body.nev;
        res.locals.noveny.viragIze = req.body.viragIze;
        res.locals.noveny.viragzasIdeje = req.body.viragzasIdeje;
        res.locals.noveny._botanikus = res.locals.botanikus._id;

        res.locals.noveny.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect(`/novenyek`);
        });
    };
 };