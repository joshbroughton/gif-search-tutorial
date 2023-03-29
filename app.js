// Require Libraries
const express = require('express');
const exphbs = require('express-handlebars');
require('dotenv').config();


// App Setup
const app = express();
app.use(express.static('public'));
// Middleware


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views')

// Routes
  // ROUTES
  app.get('/', (req, res) => {
    term = '';
    if (req.query.term) {
      term = req.query.term;
    }
    //
    const key = process.env.KEY;
    console.log(key)
    const limit = 10;
    const url = 'https://tenor.googleapis.com/v2/search?q='+ term + '&key=' + key + '&limit=' + limit
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        gifs = data.results
        res.render('home', { gifs })
      }).catch(console.error);
  })

app.get('/greetings/:name', (req, res) => {
  // grab the name from the path provided
  const name = req.params.name;
  // render the greetings view, passing along the name
  res.render('greetings', { name });
})
// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});