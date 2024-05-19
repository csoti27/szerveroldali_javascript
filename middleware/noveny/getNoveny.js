/**
 * param: novenyID (int)
 * Visszaadja az adott ID-hez tartozó növényt
 * Ha nincs növény ilyen ID-vel akkor átirányít a főoldalra
 */

 const requireOption = require('../common/requireOption');

 module.exports = function (objectrepository) {
    const NovenyModel = requireOption(objectrepository, 'NovenyModel');

    return function(req, res, next) {
        NovenyModel.findOne(
            {
                _id: req.params.novenyID
            },
            (err, noveny) => {
                if (err || !noveny) {
                    return next(err);
                }

                res.locals.noveny = noveny;
                return next();
            }
        );
    };
 };