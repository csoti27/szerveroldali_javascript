/**
 * param: novenyID (int)
 * Törli az adott ID-hez tartozó növényt
 * Ha nincs növény ilyen ID-vel akkor átirányít a főoldalra
 */

const requireOption = require('../common/requireOption');

 module.exports = function (objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.noveny === 'undefined') {
            return next();
        }

        res.locals.noveny.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/novenyek');
        });
    };
 };