/**
 * param: botanikusID (int)
 * Visszaadja az adott ID-hez tartozó botanikust
 * Ha nincs botanikus ilyen ID-vel akkor átirányít a főoldalra
 */

 const requireOption = require('../common/requireOption');

 module.exports = function (objectrepository) {
    
    const BotanikusModel = requireOption(objectrepository, 'BotanikusModel');

    return async (req, res, next) =>{
      const botanikus = await BotanikusModel.findById(req.params.botanikusid);
      
        try{if (botanikus) {
              res.locals.botanikus = botanikus;
            }else{
              res.locals.botanikus = null;
            }
            next();
          }
        catch(err) {
            next(err);
        };
};

 };