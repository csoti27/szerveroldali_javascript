/**
 * Visszaadja az adatbázisban tárolt összes botanikus adatát
 */

const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const BotanikusModel = requireOption(objectrepository, 'BotanikusModel');

    return function (req, res, next) {

      BotanikusModel.find({})
          .then(botanikus => {
              res.locals.botanikus = botanikus;
              return next();
          }).catch(err => {
          console.log(err);
          return res.status(500).json({message: 'error'});
      });
  };

 };
