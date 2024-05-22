const renderMW = require('./middleware/common/render');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const BotanikusModel = require('./models/botanikus');
const NovenyModel = require('./models/noveny');
const findByAttribute = require('./models/findByAttribute');

const deleteBotanikus = require('./middleware/botanikus/deleteBotanikus')
const getBotanikus = require('./middleware/botanikus/getBotanikus')
const getBotanikusok = require('./middleware/botanikus/getBotanikusok')
const saveBotanikus = require('./middleware/botanikus/saveBotanikus')
const deleteNoveny = require('./middleware/noveny/deleteNoveny')
const getNoveny = require('./middleware/noveny/getNoveny')
const getNovenyek = require('./middleware/noveny/getNovenyek')
const saveNoveny = require('./middleware/noveny/saveNoveny')

const app = express();
app.set('view engine', 'ejs');

const objRepo = {
    BotanikusModel: BotanikusModel,
    NovenyModel: NovenyModel,
    findByAttribute: findByAttribute
};

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/findBotanikusByName', async (req, res, next) => {
    try {
        const { nev } = req.body;
        const botanikus = await findByAttribute(BotanikusModel, 'nev', nev);
        if (botanikus) {
            res.status(200).json(botanikus);
        } else {
            res.status(404).send('Botanikus not found');
        }
    } catch (error) {
        next(error);
    }
});

app.use('/novenyek/new',
    getNoveny(objRepo),
    saveNoveny(objRepo),
    renderMW(objRepo, 'ujNoveny'));

app.use('/novenyek/edit/:novenyid',
    getNoveny(objRepo),
    saveNoveny(objRepo),
    renderMW(objRepo, 'ujNoveny'));

app.get('/novenyek/del/:novenyid',
    getNoveny(objRepo),
    deleteNoveny(objRepo),
    renderMW(objRepo, 'novenyek'));

app.get('/novenyek',
    getNovenyek(objRepo),
    renderMW(objRepo, 'novenyek'));


app.use('/botanikusok/new',
    getBotanikus(objRepo),
    saveBotanikus(objRepo),
    renderMW(objRepo, 'ujBotanikus'));

app.use('/botanikusok/edit/:botanikusid',
    getBotanikus(objRepo),
    saveBotanikus(objRepo),
    renderMW(objRepo, 'ujBotanikus'));

app.get('/botanikusok/del/:botanikusid',
    getBotanikus(objRepo),
    deleteBotanikus(objRepo),
    renderMW(objRepo, 'botanikusok'));

app.get('/botanikusok',
    getBotanikusok(objRepo),
    renderMW(objRepo, 'botanikusok'));

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});

  