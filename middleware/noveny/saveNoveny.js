/**
 * param: novenyID (int)
 * Elmenti az adott ID-re a bevitt adatokat
 * Ha nincs növény ilyen ID-vel akkor létrehoz egyet a bevitt adatokkal
 * Ha van már ilyen ID-vel növény akkor átírja az adatait a bevitt adatokra
 */

const requireOption = require('../common/requireOption');
const findByAttribute = require('../../models/findByAttribute');

module.exports = function (objectrepository) {
    const NovenyModel = requireOption(objectrepository, 'NovenyModel');
    const BotanikusModel = requireOption(objectrepository, 'BotanikusModel');

    return async (req, res, next) =>{
        if (
            typeof req.body.nev === 'undefined' ||
            typeof req.body.viragIze === 'undefined' ||
            typeof req.body.viragzasIdeje === 'undefined'
        ) {
            return next();
        }
        var noveny = await NovenyModel.findById(req.params.novenyid);
        if(!noveny){
            noveny = new NovenyModel();
        }

        noveny.nev = req.body.nev;
        noveny.viragIze = req.body.viragIze;
        noveny.viragzasIdeje = req.body.viragzasIdeje;
        //megkeresni ilyen nevű botanikust, majd azt beállítani attributeként
        const botanikusNev = req.body.botanikus;
        var botanikus = await findByAttribute(BotanikusModel,'nev',botanikusNev);
        if(!botanikus){
            botanikus = new BotanikusModel();
            botanikus.nev=req.body.botanikus;
            await botanikus.save();
        }
        noveny.botanikusNev=req.body.botanikus;
        
        noveny.save().then(() => {
            return res.redirect(`/novenyek`);
        }).catch(err => {
            console.log(err);
            return res.status(500).json({ message: 'error' });
        });
    };
};