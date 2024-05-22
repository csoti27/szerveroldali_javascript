/**
 * Visszaadja az adatbázisban tárolt összes növény adatát
 */

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    const NovenyModel = requireOption(objectrepository, 'NovenyModel');

    return function (req, res, next) {
        console.log(res);

        NovenyModel.find({})
            .then(noveny => {
                res.locals.novenyek = noveny;
                return next();
            }).catch(err => {
            console.log(err);
            return res.status(500).json({message: 'error'});
        });
    };
};