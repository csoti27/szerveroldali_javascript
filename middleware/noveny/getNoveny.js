/**
 * param: novenyID (int)
 * Visszaadja az adott ID-hez tartozó növényt
 * Ha nincs növény ilyen ID-vel akkor átirányít a főoldalra
 */

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    const NovenyModel = requireOption(objectrepository, 'NovenyModel');
    return async (req, res, next) => {
        const noveny = await NovenyModel.findById(req.params.novenyid);
        console.log(req.params.novenyid);
        try {
            if (noveny) {
                res.locals.novenyek = noveny;
            } else {
                res.locals.novenyek = null;
            }
            next();
        }
        catch (err) {
            next(err);
        };
    };
};