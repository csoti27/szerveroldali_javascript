/**
 * param: novenyID (int)
 * Visszaadja az adott ID-hez tartozó növényt
 * Ha nincs növény ilyen ID-vel akkor átirányít a főoldalra
 */

const requireOption = require('../common/requireOption');
const findByAttribute = require('../../models/findByAttribute');

module.exports = function (objectrepository) {
    const NovenyModel = requireOption(objectrepository, 'NovenyModel');
    const BotanikusModel = requireOption(objectrepository, 'BotanikusModel');

    return async (req, res, next) => {
        const noveny = await NovenyModel.findById(req.params.novenyid);
        console.log(noveny);
        if (noveny)
            var botanikus = await findByAttribute(BotanikusModel, '_id', noveny._botanikus);
        try {
            if (noveny) {
                res.locals.novenyek = noveny;
                res.locals.novenyek._botanikus = botanikus;
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