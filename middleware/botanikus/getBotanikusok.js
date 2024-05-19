/**
 * Visszaadja az adatbázisban tárolt összes botanikus adatát
 */

 const requireOption = require('../common/requireOption');

 module.exports = function (objectrepository) {

    const BotanikusModel = requireOption(objectrepository, 'BotanikusModel');

  return function (req, res, next) {
    if (typeof res.locals.botanikus === 'undefined') {
        return next();
    }
    //lets find the user
    BotanikusModel.find({}, function (err, results) {
      if (err) {
        return next(err);
      }

      res.locals.botanikusok = results;

      return next();
    });

  };

 };