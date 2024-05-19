const renderMW = require('../middleware/common/render');

const deleteBotanikus =require('../middleware/botanikus/deleteBotanikus')
const getBotanikus =require('../middleware/botanikus/getBotanikus')
const getBotanikusok =require('../middleware/botanikus/getBotanikusok')
const saveBotanikus =require('../middleware/botanikus/saveBotanikus')
const deleteNoveny =require('../middleware/noveny/deleteNoveny')
const getNoveny =require('../middleware/noveny/getNoveny')
const getNovenyek =require('../middleware/noveny/getNovenyek')
const saveNoveny =require('../middleware/noveny/saveNoveny')

const BotanikusModel = require('../models/botanikus');
const NovenyModel = require('../models/noveny');

module.exports = function (app) {
    const objRepo = {
        BotanikusModel: BotanikusModel,
        NovenyModel: NovenyModel
    };
    
    app.use('/novenyek/new',
        saveNoveny(objRepo),
        renderMW(objRepo, 'novenyNew'));
  
    app.use('/novenyek/edit/:novenyid',
        getNoveny(objRepo),
        saveNoveny(objRepo),
        renderMW(objRepo, 'novenyNew'));
  
    app.get('/novenyek/del/:novenyid',
        getNoveny(objRepo),
        deleteNoveny(objRepo),
        renderMW(objRepo, 'novenyek'));
  
    app.get('/novenyek',
        getNovenyek(objRepo),
        renderMW(objRepo, 'novenyek'));
  
   
    app.use('/botanikusok/new',
        saveBotanikus(objRepo),
        renderMW(objRepo, 'botanikusNew'));
  
    app.use('/botanikusok/edit/:botanikusid',
        getBotanikus(objRepo),
        saveBotanikus(objRepo),
        renderMW(objRepo, 'botanikusNew'));
  
    app.get('/botanikusok/del/:botanikusid',
        getBotanikus(objRepo),
        deleteBotanikus(objRepo),
        renderMW(objRepo, 'botanikusok'));

     app.get('/botanikusok',
        getBotanikusok(objRepo),
        renderMW(objRepo, 'botanikusok'));
  
        
  };
  