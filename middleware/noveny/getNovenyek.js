/**
 * Visszaadja az adatbázisban tárolt összes növény adatát
 */

const requireOption = require('../common/requireOption');

 module.exports = function (objectrepository) {
    const NovenyModel = requireOption(objectrepository, 'NovenyModel');

    return function(req, res, next) {


        NovenyModel.find({})
        .then(noveny => {
             res.locals.noveny = noveny
            }).catch(err=>{
                console.log(err);
                return res.status(500).json({message:'error'});
            });
    };
 };