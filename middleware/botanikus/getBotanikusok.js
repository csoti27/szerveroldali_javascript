/**
 * Visszaadja az adatbázisban tárolt összes botanikus adatát
 */

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const BotanikusModel = requireOption(objectrepository, 'BotanikusModel');

    return function (req, res, next) {
        //lets find the user
        BotanikusModel.find({}).then(results => {
            res.locals.botanikusok = results;
            return next();
        }).catch(err => {
            console.log(err);
            return res.status(500).json({message: 'error'});
        });

    };

};