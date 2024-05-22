/**
 * param: botanikusID (int)
 * Törli az adott ID-hez tartozó botanikus
 * Ha nincs botanikus ilyen ID-vel akkor átirányít a főoldalra
 */

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    const BotanikusModel = requireOption(objectrepository, 'BotanikusModel');

    return async (req, res, next) => {
        if (typeof res.locals.botanikus === 'undefined') {
            return next();
        }
        const botanikus = await BotanikusModel.findByIdAndRemove(req.params.botanikusid);

        return res.redirect('/botanikusok');
    };
};
