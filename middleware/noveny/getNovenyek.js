/**
 * Visszaadja az adatbázisban tárolt összes növény adatát
 */

const requireOption = require('../common/requireOption');

 module.exports = function (objectrepository) {
    const NovenyModel = requireOption(objectrepository, 'NovenyModel');

    return function(req, res, next) {
        if (typeof res.locals.botanikus === 'undefined') {
            return next();
        }

        NovenyModel.find({ _botanikus: res.locals.botanikus._id }, (err, results) => {
            if (err) {
                return next(err);
            }

            res.locals.novenyek = results;
            return next();
        });
    };
 };