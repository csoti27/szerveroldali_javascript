/**
 * Visszaadja az adatbázisban tárolt összes növény adatát
 */

const requireOption = require('../common/requireOption');
const findByAttribute = require('../../models/findByAttribute');

module.exports = function (objectrepository) {
    const NovenyModel = requireOption(objectrepository, 'NovenyModel');
    const BotanikusModel = requireOption(objectrepository, 'BotanikusModel');

    return function (req, res, next)  {
        console.log(res);

        NovenyModel.find({})
            .then(async noveny => {
                console.log(`Botanikus: ${noveny}`);
                res.locals.novenyek = noveny;
                const botanikus = await findByAttribute(BotanikusModel, '_id', noveny._botanikus);
                console.log(`Botanikus: ${botanikus}`);

                res.locals.botanikus = botanikus;
                return next();
            }).catch(err => {
            console.log(err);
            return res.status(500).json({message: 'error'});
        });
    };
};