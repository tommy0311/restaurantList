const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 

const routes = require('./routes') // It is equal to require('./routes/index')
require('./config/mongoose')

const app = express();
const port = 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

// localhost:3000 
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});