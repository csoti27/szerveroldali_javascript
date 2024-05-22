/**
 * param: novenyID (int)
 * Törli az adott ID-hez tartozó növényt
 * Ha nincs növény ilyen ID-vel akkor átirányít a főoldalra
 */

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    const NovenyModel = requireOption(objectrepository, 'NovenyModel');

    return async (req, res, next) => {
        if (typeof res.locals.novenyek === 'undefined') {
            return next();
        }

        const noveny = await NovenyModel.findByIdAndRemove(req.params.novenyid);

        return res.redirect('/novenyek');
    };
};