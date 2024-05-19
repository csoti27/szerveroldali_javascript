/**
 * param: botanikusID (int)
 * Törli az adott ID-hez tartozó botanikus
 * Ha nincs botanikus ilyen ID-vel akkor átirányít a főoldalra
 */

 const requireOption = require('../common/requireOption');

 module.exports = function (objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.botanikus === 'undefined') {
            return next();
        }

        res.locals.botanikus.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/botanikusok');
        });
    };
 };