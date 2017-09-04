const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  fs.appendFileSync('server.log',log + '\n', (er) => {
    if (er) {
      console.log(`Couldn't append log`);
    }
  });
  console.log(log);
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    titlePage: 'Home page',
    welcomeMessage: 'Hello there',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    titlePage: 'About page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'this is badaa',
  });
});

app.listen(port);
