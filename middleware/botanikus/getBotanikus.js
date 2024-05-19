/**
 * param: botanikusID (int)
 * Visszaadja az adott ID-hez tartozó botanikust
 * Ha nincs botanikus ilyen ID-vel akkor átirányít a főoldalra
 */

 const requireOption = require('../common/requireOption');

 module.exports = function (objectrepository) {
    
    const BotanikusModel = requireOption(objectrepository, 'BotanikusModel');

    return function (req, res, next) {
        BotanikusModel.findOne({_id: req.params.botanikusID},(err, result) => {
            if (err || !result) {
              return next(err);
            }

            res.locals.botanikus =result;
            return next();
        });
     };
 };