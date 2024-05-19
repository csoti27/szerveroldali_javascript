const express = require('express');
const app = express();
const port = 3000;

var session = require('express-session');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('static'));

//require('./route/index')(app);
/*
app.use(
  function(req, res, next){
    res.locals.botanikusok=[
      {nev: "Kert Elek", eletkor: "56", elvesztettKesztyuk: "200+", korabbiAllas: "buszsofőr"},
      {nev: "Bot Attila", eletkor: "30", elvesztettKesztyuk: "7", korabbiAllas: "informatikus"},
      {nev: "Tuti István", eletkor: "25", elvesztettKesztyuk: "15 (pár)", korabbiAllas: "cégvezető"},
      {nev: "Vladimir Putin", eletkor: "70", elvesztettKesztyuk: "-2", korabbiAllas: "hentes"}
    ]
    res.locals.novenyek=[
        {nev: "Leveletlen lóhere", botanikus: "Kert Elek", viragIze: "erősen sós", viragzasIdeje: "szeptember"},
        {nev: "Türkiz szamóca", botanikus: "Bot Attila", viragIze: "nem szamóca", viragzasIdeje: "április"},
        {nev: "Sarki egres", botanikus: "Tuti István", viragIze: "méz édes", viragzasIdeje: "december"},
        {nev: "Rakoncátlan tavirózsa", botanikus: "Vladimir Putin", viragIze: "keserű", viragzasIdeje: "havonta"}
    ]
    
  return next();
  },
  function(req, res, next){
    res.render("novenyek", res.locals);
  }
)
*/
app.use(session({
  secret: 'titok',
}));


require('./route/index')(app);
/*
app.use(function (req, res, next) {
  res.locals = {};
  res.locals.error = [];

  return next();
});
*/

app.use(function (err, req, res, next) {
  res.status(500).send('Houston, we have a problem!');

  //Flush out the stack to the console
  console.error(err.stack);
});

app.listen(3000,()=>{
    console.log('Server started at http://localhost:' + port+"/novenyek.html");
});
